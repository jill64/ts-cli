import { Schema } from '../../types/context/Schema.js'

export const matchRoute =
  <T extends Schema['routes']>(routes: T) =>
  (args: string[]) => {
    const input = args
      .filter((x) => !x.startsWith('-'))
      .join(' ')
      .trim()

    if (!input) {
      return undefined
    }

    const matched = Object.keys(routes)
      .toSorted((a, b) => a.length - b.length)
      .find((route) => route.startsWith(input))

    return matched as keyof T | undefined
  }
