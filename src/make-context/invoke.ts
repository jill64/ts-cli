import { transform } from '@jill64/transform'
import { Schema } from '../types/context/Schema.js'
import { InvokeRoute } from '../types/context/invoke-route/InvokeRoute.js'
import { proxy } from './proxy.js'

export const invoke = <T extends Schema>(schema: T) => {
  const exec = proxy(schema)
  return transform(schema.routes, ([key]) => [key, exec(key)]) as InvokeRoute<T>
}
