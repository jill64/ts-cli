import { RunCommand } from '../literal/RunCommand.js'
import { Schema } from './Schema.js'
import { AddRoute } from './add-route/AddRoute.js'
import { InvokeHandler } from './invoke-route/InvokeHandler.js'
import { InvokeRoute } from './invoke-route/InvokeRoute.js'

export type Context<T extends Schema = Schema> = {
  add: AddRoute<T>
  invoke: InvokeRoute<T>
  execute: InvokeHandler<T['root']['config']>
  run: RunCommand
}
