import { Schema } from '../../types/context/Schema.js'

export const matchRoute =
  <T extends Schema['routes']>(routes: T) =>
  (args: string[]) => {
    const input = args.join(' ').trim()

    if (!input) {
      return undefined
    }

    const matched = Object.keys(routes)
      .toSorted((a, b) => b.length - a.length)
      .find((route) => input.startsWith(route))

    return matched as keyof T | undefined
  }
