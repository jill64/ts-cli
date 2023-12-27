import { makeContext } from './make-context/index.js'
import { RootCommand } from './types/RootCommand.js'
import { RootConfig } from './types/context/RootConfig.js'
import { RootConfigInput } from './types/context/RootConfigInput.js'
import { RouteHandler } from './types/context/route-handler/RouteHandler.js'
import { RESERVED_OPTIONS } from './utils/RESERVED_OPTIONS.js'
import { isolateArgs } from './utils/isolateArgs.js'

export const command: RootCommand = <
  T extends RootConfigInput,
  H extends RouteHandler<RootConfig<T>>
>(
  name: string,
  arg: T | H,
  opt?: H
) => {
  const { config, handler } = isolateArgs<T, H>(arg, opt)

  const ctx = makeContext({
    name,
    root: {
      config: {
        ...config,
        options: {
          ...RESERVED_OPTIONS,
          ...config.options
        }
      },
      // @ts-expect-error TODO: fix this
      handler
    },
    routes: {}
  })

  return ctx
}
