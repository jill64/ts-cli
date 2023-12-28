import { Config } from '../types/context/Config.js'
import { Schema } from '../types/context/Schema.js'
import { RouteHandler } from '../types/context/route-handler/RouteHandler.js'
import { Empty } from '../types/literal/Empty.js'

export const pickRoute = <
  T extends Schema,
  R extends keyof T['routes'] & Lowercase<string>
>(
  { routes, root }: T,
  route?: R
) =>
  (route && route in routes ? routes[route] : root) as T['routes'][R] extends {
    config: Config
    handler: RouteHandler<Empty>
  }
    ? {
        config: T['routes'][R]['config']
        handler: T['routes'][R]['handler']
      }
    : {
        config: T['root']['config']
        handler: T['root']['handler']
      }
