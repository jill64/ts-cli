import { RootConfig } from '../types/context/RootConfig.js'
import { Schema } from '../types/context/Schema.js'
import { InvokeParam } from '../types/context/invoke-route/InvokeParam.js'
import { createLogger } from '../utils/createLogger.js'
import { pickRoute } from '../utils/pickRoute.js'
import { help } from './help.js'

export const proxy =
  <T extends Schema>(schema: T) =>
  <R extends keyof T['routes'] & Lowercase<string>>(route?: R) => {
    const { handler } = pickRoute(schema, route)

    return (arg?: InvokeParam<RootConfig>) => {
      const logger = createLogger(arg?.options)

      const param = {
        ...arg,
        logger
      }

      if ('options' in param) {
        if (param?.options?.help) {
          console.log(help(schema, route))
          return
        }

        if (schema.root.config.version && param?.options?.version) {
          console.log(param.options.version)
          return
        }
      }

      return handler(param)
    }
  }
