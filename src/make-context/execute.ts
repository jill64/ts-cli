import { Schema } from '../types/context/Schema.js'
import { InvokeHandler } from '../types/context/invoke-route/InvokeHandler.js'
import { proxy } from './proxy.js'

export const execute = <T extends Schema>(schema: T) =>
  proxy(schema)() as InvokeHandler<T['root']['config']>
