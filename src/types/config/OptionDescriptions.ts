import { OptionType } from '../OptionType.js'

export type OptionDescriptions = Record<
  string,
  {
    /**
     * Description of option.
     * @example 'Show help'
     */
    description?: string

    /**
     * Alias of option.
     * @example 'h'
     */
    alias?: string

    /**
     * Type of option.
     * @default 'boolean'
     */
    type?: OptionType
  }
>
