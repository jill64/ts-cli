import { OptionDescriptions } from '../types/config/OptionDescriptions.js'

export const RESERVED_OPTIONS = {
  silent: {
    alias: 's',
    description: 'Suppress all output'
  },
  quiet: {
    alias: 'q',
    description: 'Suppress all output except errors'
  },
  verbose: {
    alias: 'V',
    description: 'Show verbose output'
  },
  debug: {
    alias: 'd',
    description: 'Show debug output'
  },
  trace: {
    alias: 't',
    description: 'Show trace output'
  },
  help: {
    alias: 'h',
    description: 'Show help'
  },
  version: {
    alias: 'v',
    description: 'Show version'
  }
} as const satisfies OptionDescriptions
