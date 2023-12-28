import { Config } from '../types/Config.js'
import { RESERVED_OPTIONS } from './RESERVED_OPTIONS.js'

export type Reserved<T extends Config> = T & {
  options: typeof RESERVED_OPTIONS
}
