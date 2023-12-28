import { ArgumentDescriptions } from '../describe/ArgumentDescriptions.js'
import { Empty } from '../literal/Empty.js'

export type NormalizedArguments<T extends ArgumentDescriptions | undefined> =
  T extends Map<infer U, string>
    ? Record<U extends string ? U : never, string>
    : T extends [infer U, string][]
      ? Record<U extends string ? U : never, string>
      : T extends {
            description: Record<infer U, string>
          }
        ? Record<U, string>
        : T extends Record<infer U, string>
          ? Record<U extends string ? U : never, string>
          : Empty
