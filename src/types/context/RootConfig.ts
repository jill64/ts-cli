import { Reserved } from '../util/Reserved.js'
import { RootConfigInput } from './RootConfigInput.js'

export type RootConfig<T extends RootConfigInput = RootConfigInput> =
  Reserved<T>
