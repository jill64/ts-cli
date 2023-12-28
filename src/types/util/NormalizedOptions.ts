import { OptionDescriptions } from '../describe/OptionDescriptions.js'
import { OptionType } from '../literal/OptionType.js'
import { OptionTypeMap } from '../literal/OptionTypeMap.js'

export type NormalizedOptions<T extends OptionDescriptions | undefined> = {
  [K in keyof T]: T[K] extends { type: OptionType }
    ? OptionTypeMap[T[K]['type']]
    : boolean
}
