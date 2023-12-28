import { RESERVED_OPTIONS } from '../../utils/RESERVED_OPTIONS.js'
import { Config } from '../context/Config.js'

export type Reserved<T extends Config> = T & {
  options: typeof RESERVED_OPTIONS
}
