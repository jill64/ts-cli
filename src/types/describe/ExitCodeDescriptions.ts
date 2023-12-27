import { ExitCode } from '../literal/ExitCode.js'

/**
 * Descriptions of exit codes.
 * @example 
 * {
 *   0: 'Success',
 *   1: 'Failure'
 * }
 */
export type ExitCodeDescriptions = Record<ExitCode, string>
