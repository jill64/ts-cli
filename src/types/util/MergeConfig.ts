import { Config } from '../Config.js'

export type MergeConfig<RootConfig extends Config, T extends Config> = T &
  (RootConfig extends { options: unknown }
    ? { options: RootConfig['options'] }
    : T) &
  (RootConfig extends { codes: unknown } ? { codes: RootConfig['codes'] } : T)
