import { Config } from '../Config.js'
import { MaybePromise } from '../util/MaybePromise.js'

export type InvokeHandlerReturn<T extends Config> = MaybePromise<
  keyof T['codes'] | void
>
