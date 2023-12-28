import { MergeConfig } from '../../util/MergeConfig.js'
import { Config } from '../Config.js'
import { RootConfig } from '../RootConfig.js'
import { RouteHandler } from '../route-handler/RouteHandler.js'

export type Route<
  T extends Lowercase<string>,
  RC extends RootConfig,
  C extends Config,
  H extends RouteHandler<MergeConfig<RC, C>>
> = {
  routes: Record<
    T,
    {
      config: C
      handler: H
    }
  >
}
