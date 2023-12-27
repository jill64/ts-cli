import { ArgumentDescriptions } from '../describe/ArgumentDescriptions.js'
import { ExitCodeDescriptions } from '../describe/ExitCodeDescriptions.js'
import { OptionDescriptions } from '../describe/OptionDescriptions.js'
import { RestDescription } from '../describe/RestDescription.js'

export type Config = {
  args?: ArgumentDescriptions
  options?: OptionDescriptions
  codes?: ExitCodeDescriptions
} & (
  | {
      optional?: ArgumentDescriptions
    }
  | {
      rest?: RestDescription
    }
)
