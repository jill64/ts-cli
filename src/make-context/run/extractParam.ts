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

  const result = parseArgs({
    options,
    args,
    allowPositionals: true,
    tokens: true,
    strict: true
  })

  const routeDepth = route?.split(' ').length ?? 0
  const alignedArgs = alignmentArguments(config.args)

  const param = {
    args: (config.args
      ? Object.fromEntries(
          alignedArgs.map((k, index) => [
            k,
            result.positionals[index + routeDepth]
          ])
        )
      : {}) as NormalizedArguments<T['args']>,
    options: (config.options
      ? transform(config.options, ([k]) => [k, result.values[k]])
      : {}) as NormalizedOptions<T['options']>,
    optional: ('optional' in config && config.optional
      ? Object.fromEntries(
          alignmentArguments(config.optional).map((k, index) => [
            k,
            result.positionals[alignedArgs.length + index + routeDepth]
          ])
        )
      : {}) as T extends { optional: ArgumentDescriptions }
      ? NormalizedArguments<T['optional']>
      : never,
    rest: ('rest' in config && config.rest
      ? result.positionals.slice(alignedArgs.length + routeDepth)
      : {}) as T extends {
      rest: ArgumentDescriptions
    }
      ? string[]
      : never
  }

  return param
}
