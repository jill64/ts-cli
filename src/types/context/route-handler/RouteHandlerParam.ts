import { Logger } from '../../literal/Logger.js'
import { Config } from '../Config.js'
import { InvokeParam } from '../invoke-route/InvokeParam.js'

export type RouteHandlerParam<T extends Config> = InvokeParam<T> & {
  logger: Logger
}
