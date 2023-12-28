import { Config } from '../types/context/Config.js'
import { Schema } from '../types/context/Schema.js'
import { AddRoute } from '../types/context/add-route/AddRoute.js'
import { RouteHandler } from '../types/context/route-handler/RouteHandler.js'
import { MergeConfig } from '../types/util/MergeConfig.js'
import { isolateArgs } from '../utils/isolateArgs.js'
import { makeContext } from './index.js'

export const add =
  <T extends Schema>(schema: T): AddRoute<T> =>
  <
    R extends Lowercase<string>,
    C extends Config,
    H extends RouteHandler<MergeConfig<T['root']['config'], C>>
  >(
    route: R,
    arg: C | H,
    opt?: H
  ) => {
    const { config, handler } = isolateArgs<C, H>(arg, opt)

    const newRoute = {
      [route]: {
        config,
        handler
      }
    } as Record<R, { config: C; handler: H }>

    const newSchema = {
      ...schema,
      routes: {
        ...schema.routes,
        ...newRoute
      }
    }

    const ctx = makeContext(newSchema)

    return ctx
  }
