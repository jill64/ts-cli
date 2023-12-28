import { OptionDescriptions } from '../config/OptionDescriptions.js'
import { OptionType } from '../OptionType.js'
import { OptionTypeMap } from '../OptionTypeMap.js'

export type NormalizedOptions<T extends OptionDescriptions | undefined> = {
  [K in keyof T]: T[K] extends { type: OptionType }
    ? OptionTypeMap[T[K]['type']]
    : boolean
}
