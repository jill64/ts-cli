import { Empty } from '../../literal/Empty.js'
import { MergeConfig } from '../../util/MergeConfig.js'
import { Config } from '../Config.js'
import { Context } from '../Context.js'
import { Schema } from '../Schema.js'
import { RouteHandler } from '../route-handler/RouteHandler.js'
import { Route } from './Route.js'

export type AddRoute<T extends Schema> = {
  <
    R extends Lowercase<string>,
    C extends Config,
    H extends RouteHandler<MergeConfig<T['root']['config'], C>>
  >(
    route: R,
    config: C,
    handler: H
  ): Context<T & Route<R, T['root']['config'], C, H>>
  <
    R extends Lowercase<string>,
    H extends RouteHandler<MergeConfig<T['root']['config'], Empty>>
  >(
    route: R,
    handler: H
  ): Context<T & Route<R, T['root']['config'], Empty, H>>
}
