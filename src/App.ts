import { transform } from '@jill64/transform'
import { ParseArgsConfig, parseArgs } from 'node:util'
import { Config } from './types/Config.js'
import { ParseArgsOptionConfig } from './types/ParseArgsOptionConfig.js'
import { ArgumentDescriptions } from './types/config/ArgumentDescriptions.js'
import { InvokeHandler } from './types/invoke-route/InvokeHandler.js'
import { InvokeParam } from './types/invoke-route/InvokeParam.js'

export class App<
  RC extends Config,
  RH extends InvokeHandler<RC>,
  RT extends Record<
    string,
    {
      config: Config
      handler: InvokeHandler<Config>
    }
  >
> {
  private readonly _invoke

  constructor(
    private readonly config: RC,
    private readonly handler: RH,
    private readonly routes = {} as RT
  ) {
    this.config = config
    this.handler = handler
    this.routes = routes
    this._invoke = transform(routes, ([route, { config, handler }]) => [
      route,
      (param: InvokeParam<Config>) => handler(param, config)
    ]) as {
      [K in keyof RT]: InvokeHandler<RT[K]['config']>
    }
  }

  get invoke() {
    return this._invoke
  }

  add<T extends string, C extends Config, H extends InvokeHandler<C>>(
    route: T,
    config: C,
    handler: H
  ) {
    return new App<
      RC,
      RH,
      RT &
        Record<
          T,
          {
            config: C
            handler: H
          }
        >
    >(this.config, this.handler, {
      ...this.routes,
      [route]: {
        config,
        handler
      }
    })
  }

  execute(param: InvokeParam<RC>) {
    return this.handler(param, this.config)
  }

  private lookup(args: string[]): keyof RT | undefined {
    const input = args.join(' ').trim()

    if (!input) {
      return undefined
    }

    return Object.keys(this.routes)
      .toSorted((a, b) => b.length - a.length)
      .find((route) => input.startsWith(route))
  }

  private split_args(
    args: string[],
    config: Config,
    options: ParseArgsConfig['options'],
    alignedArgs: string[],
    alignedOpts: string[],
    route?: keyof RT
  ) {
    const routeDepth = route?.toString()?.split(' ').length ?? 0
    const routed = route ? args.slice(routeDepth) : args

    if (!config.rest?.description) {
      return {
        truncated: routed,
        rest: []
      }
    }

    const offset = alignedArgs.length + alignedOpts.length

    if (!offset) {
      return {
        truncated: [],
        rest: routed
      }
    }

    const { tokens } = parseArgs({
      options,
      args: routed,
      allowPositionals: true,
      tokens: true,
      strict: false
    })

    const positionals = tokens.filter((t) => t.kind === 'positional')

    const index = (positionals[offset - 1]?.index ?? 0) + 1
    const truncated = routed.slice(0, index)
    const rest = routed.slice(index)

    return {
      truncated,
      rest
    }
  }

  private alignment_arguments(args?: ArgumentDescriptions) {
    if (!args) {
      return []
    }

    if (args instanceof Map) {
      return [...args.keys()]
    }

    if (Array.isArray(args)) {
      return args.map(([k]) => k)
    }

    if ('description' in args && typeof args.description === 'object') {
      return args.list as string[]
    }

    return Object.keys(args)
  }

  private extract(args: string[]): InvokeParam<RC>
  private extract<R extends keyof RT>(
    args: string[],
    route: R
  ): InvokeParam<RT[R]['config']>
  private extract(args: string[], route?: keyof RT): InvokeParam<Config> {
    const config = route ? this.routes[route].config : this.config
    const options = transform(config.options ?? {}, ([k, v]) => [
      k,
      {
        type:
          'type' in v && (v.type === 'string' || v.type === 'string[]')
            ? 'string'
            : 'boolean',
        multiple:
          'type' in v && (v.type === 'string[]' || v.type === 'boolean[]')
            ? true
            : false,
        short: v.alias
      } satisfies ParseArgsOptionConfig
    ])

    const alignedArgs = this.alignment_arguments(config.args)
    const alignedOpts = this.alignment_arguments(config.optional)

    const { truncated, rest } = this.split_args(
      args,
      config,
      options,
      alignedArgs,
      alignedOpts,
      route
    )

    const result = parseArgs({
      options,
      args: truncated,
      allowPositionals: true,
      tokens: true,
      strict: true
    })

    const param = {
      args: Object.fromEntries(
        alignedArgs.map((k, index) => [k, result.positionals[index]])
      ),
      options: transform(config.options ?? {}, ([k]) => [k, result.values[k]]),
      optional: Object.fromEntries(
        alignedOpts.map((k, index) => [
          k,
          result.positionals[alignedArgs.length + index]
        ])
      ),
      rest
    }

    return param
  }

  run(argv: string[]) {
    const [, , ...args] = argv

    const route = this.lookup(args)

    return route
      ? this.invoke[route](this.extract(args, route))
      : this.execute(this.extract(args))
  }
}
