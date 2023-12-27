import { ArgumentDescriptions } from '../../describe/ArgumentDescriptions.js'
import { OptionDescriptions } from '../../describe/OptionDescriptions.js'
import { RestDescription } from '../../describe/RestDescription.js'
import { NormalizedArguments } from '../../util/NormalizedArguments.js'
import { NormalizedOptions } from '../../util/NormalizedOptions.js'
import { Config } from '../Config.js'

export type InvokeParam<T extends Config> = (T extends {
  args: ArgumentDescriptions
}
  ? {
      args: NormalizedArguments<T['args']>
    }
  : unknown) &
  (T extends {
    options: OptionDescriptions
  }
    ? {
        options?: Partial<NormalizedOptions<T['options']>>
      }
    : unknown) &
  (T extends {
    optional: ArgumentDescriptions
  }
    ? {
        optional?: Partial<NormalizedArguments<T['optional']>>
      }
    : unknown) &
  (T extends {
    rest: RestDescription
  }
    ? {
        rest?: Partial<string[]>
      }
    : unknown)
