import { Logger } from '../types/literal/Logger.js'
import { NormalizedOptions } from '../types/util/NormalizedOptions.js'
import { RESERVED_OPTIONS } from './RESERVED_OPTIONS.js'

const empty = () => {}

export const createLogger = (
  options?: Partial<NormalizedOptions<typeof RESERVED_OPTIONS>>
): Logger => {
  const { quiet, silent, verbose, debug, trace } = options ?? {}

  return {
    error: silent ? empty : console.error,
    warn: silent || quiet ? empty : console.warn,
    info: trace || debug || verbose ? console.info : empty,
    debug: trace || debug ? console.debug : empty,
    trace: trace ? console.trace : empty
  }
}
