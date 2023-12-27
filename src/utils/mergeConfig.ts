import { Config } from '../types/context/Config.js'
import { MergeConfig } from '../types/util/MergeConfig.js'

export const mergeConfig = <R extends Config, C extends Config>(
  root: R,
  config: C
) =>
  ({
    ...config,
    options: {
      ...root.options,
      ...config.options
    },
    codes: {
      ...root.options,
      ...config.codes
    }
  } as MergeConfig<R, C>)
