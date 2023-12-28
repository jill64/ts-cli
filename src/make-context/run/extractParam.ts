import { transform } from '@jill64/transform'
import { parseArgs } from 'node:util'
import { ParseArgsOptionConfig } from '../../types/ParseArgsOptionConfig.js'
import { Config } from '../../types/context/Config.js'
import { ArgumentDescriptions } from '../../types/describe/ArgumentDescriptions.js'
import { NormalizedArguments } from '../../types/util/NormalizedArguments.js'
import { NormalizedOptions } from '../../types/util/NormalizedOptions.js'
import { alignmentArguments } from '../../utils/alignmentArguments.js'

export const extractParam = <T extends Config>(
  config: T,
  args: string[],
  route?: string
) => {
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

  const routeDepth = route?.split(' ').length ?? 0
  const routed = route ? args.slice(routeDepth) : args

  const { tokens } = parseArgs({
    options,
    args: routed,
    allowPositionals: true,
    tokens: true,
    strict: false
  })

  const alignedArgs = alignmentArguments(config.args)
  const positionals = tokens.filter((t) => t.kind === 'positional')

  const hasRest =
    'rest' in config && config.rest && positionals.length > alignedArgs.length

  const restIndex = hasRest
    ? alignedArgs.length
      ? (positionals[alignedArgs.length - 1]?.index ?? 0) + 1
      : 0
    : routed.length

  const truncated = routed.slice(0, restIndex)
  const rest = routed.slice(restIndex)

  const result = parseArgs({
    options,
    args: truncated,
    allowPositionals: true,
    tokens: true,
    strict: true
  })

  const param = {
    args: (config.args
      ? Object.fromEntries(
          alignedArgs.map((k, index) => [k, result.positionals[index]])
        )
      : {}) as NormalizedArguments<T['args']>,
    options: (config.options
      ? transform(config.options, ([k]) => [k, result.values[k]])
      : {}) as NormalizedOptions<T['options']>,
    optional: ('optional' in config && config.optional
      ? Object.fromEntries(
          alignmentArguments(config.optional).map((k, index) => [
            k,
            result.positionals[alignedArgs.length + index]
          ])
        )
      : {}) as T extends { optional: ArgumentDescriptions }
      ? NormalizedArguments<T['optional']>
      : never,
    rest: (hasRest ? rest : []) as T extends {
      rest: ArgumentDescriptions
    }
      ? string[]
      : never
  }

  return param
}
