import { MergeConfig } from '../util/MergeConfig.js'
import { Config } from './Config.js'
import { RootConfig } from './RootConfig.js'
import { RouteHandler } from './route-handler/RouteHandler.js'

export type Schema<T extends RootConfig = RootConfig> = {
  name: string
  root: {
    config: T
    handler: RouteHandler<T>
  }
  routes: {
    [name: Lowercase<string>]: {
      config: Config
      handler: RouteHandler<MergeConfig<T, Config>>
    }
  }
}
