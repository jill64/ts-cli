import { Config } from '../context/Config.js'

export type IsEmptyConfig<T extends Config> = T extends { args: unknown }
  ? false
  : T extends { options: unknown }
    ? false
    : T extends { optional: unknown }
      ? false
      : T extends { rest: unknown }
        ? false
        : true
