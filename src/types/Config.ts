import { ArgumentDescriptions } from './config/ArgumentDescriptions.js'
import { ExitCodeDescriptions } from './config/ExitCodeDescriptions.js'
import { OptionDescriptions } from './config/OptionDescriptions.js'
import { RestDescription } from './config/RestDescription.js'

export type Config = {
  args?: ArgumentDescriptions
  options?: OptionDescriptions
  codes?: ExitCodeDescriptions
  optional?: ArgumentDescriptions
  rest?: RestDescription
}
