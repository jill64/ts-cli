import { Config } from './Config.js'

export type RootConfigInput<T extends Config = Config> = T & {
  version?: string
}
