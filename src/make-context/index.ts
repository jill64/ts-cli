import { Context } from '../types/context/Context.js'
import { Schema } from '../types/context/Schema.js'
import { add } from './add.js'
import { execute } from './execute.js'
import { invoke } from './invoke.js'
import { run } from './run/index.js'

export const makeContext = <T extends Schema>(schema: T): Context<T> => ({
  invoke: invoke(schema),
  execute: execute(schema),
  add: add(schema),
  run: run(schema)
})
