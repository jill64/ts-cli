import { OptionType } from '../literal/OptionType.js'
import { ShortOption } from '../literal/ShortOption.js'

export type OptionDescriptions = Record<
  Lowercase<string>,
  {
    /**
     * Alias of option.
     * @example 'h'
     */
    alias: ShortOption

    /**
     * Description of option.
     * @example 'Show help'
     */
    description: string

    /**
     * Type of option.
     * @default 'boolean'
     */
    type?: OptionType
  }
>
