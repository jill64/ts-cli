import { MaybePromise } from '../util/MaybePromise.js'

export type RunCommand = (argv: string[]) => MaybePromise<void>
