import { MaybePromise } from '../../util/MaybePromise.js'
import { Config } from '../Config.js'

export type RouteHandlerReturn<T extends Config> = MaybePromise<
  keyof T['codes'] | void
>
