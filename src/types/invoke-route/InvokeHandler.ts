import { Config } from '../Config.js'
import { InvokeHandlerReturn } from './InvokeHandlerReturn.js'
import { InvokeParam } from './InvokeParam.js'

export type InvokeHandler<T extends Config> = (
  param: InvokeParam<T>,
  config?: T
) => InvokeHandlerReturn<T>
