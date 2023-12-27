import { ArgumentDescriptions } from '../types/describe/ArgumentDescriptions.js'

export const alignmentArguments = <T extends ArgumentDescriptions>(
  args?: T
): string[] => {
  if (!args) {
    return []
  }

  if (args instanceof Map) {
    return [...args.keys()]
  }

  if (Array.isArray(args)) {
    return args.map(([k]) => k)
  }

  if ('description' in args && typeof args.description === 'object') {
    return args.list as string[]
  }

  return Object.keys(args)
}
