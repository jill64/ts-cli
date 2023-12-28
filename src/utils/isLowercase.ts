export const isLowercase = (x: unknown): x is Lowercase<string> =>
  typeof x === 'string' && x === x.toLowerCase()
