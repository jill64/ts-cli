import { Config } from '../Config.js'
import { ArgumentDescriptions } from '../config/ArgumentDescriptions.js'
import { OptionDescriptions } from '../config/OptionDescriptions.js'
import { RestDescription } from '../config/RestDescription.js'
import { NormalizedArguments } from '../util/NormalizedArguments.js'
import { NormalizedOptions } from '../util/NormalizedOptions.js'

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
