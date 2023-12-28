import { Config } from '../Config.js'
import { RouteHandlerParam } from './RouteHandlerParam.js'
import { RouteHandlerReturn } from './RouteHandlerReturn.js'

export type RouteHandler<T extends Config> = (
  param: RouteHandlerParam<T>
) => RouteHandlerReturn<T>
