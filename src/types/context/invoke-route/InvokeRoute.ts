import { Empty } from '../../literal/Empty.js'
import { MergeConfig } from '../../util/MergeConfig.js'
import { Config } from '../Config.js'
import { Schema } from '../Schema.js'
import { RouteHandlerReturn } from '../route-handler/RouteHandlerReturn.js'
import { InvokeHandler } from './InvokeHandler.js'

export type InvokeRoute<T extends Schema> = {
  [R in keyof T['routes']]: T['routes'][R] extends { config: Config }
    ? InvokeHandler<MergeConfig<T['root']['config'], T['routes'][R]['config']>>
    : () => RouteHandlerReturn<Empty>
}
