import { IsEmptyConfig } from '../../util/IsEmptyConfig.js'
import { Config } from '../Config.js'
import { RouteHandlerReturn } from '../route-handler/RouteHandlerReturn.js'
import { InvokeParam } from './InvokeParam.js'

export type InvokeHandler<T extends Config> = IsEmptyConfig<T> extends true
  ? () => RouteHandlerReturn<T>
  : T extends {
      args: unknown
    }
  ? (param: InvokeParam<T>) => RouteHandlerReturn<T>
  : (param?: InvokeParam<T>) => RouteHandlerReturn<T>
