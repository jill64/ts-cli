import { Context } from './context/Context.js'
import { RootConfig } from './context/RootConfig.js'
import { RootConfigInput } from './context/RootConfigInput.js'
import { Schema } from './context/Schema.js'
import { RouteHandler } from './context/route-handler/RouteHandler.js'
import { Empty } from './literal/Empty.js'

export type RootCommand = {
  <T extends RootConfigInput>(
    name: string,
    config: T,
    handler: RouteHandler<RootConfig<T>>
  ): Context<
    // @ts-expect-error TODO: fix this
    Schema<RootConfig<T>>
  >
  (
    name: string,
    handler: RouteHandler<RootConfig<Empty>>
  ): Context<
    // @ts-expect-error TODO: fix this
    Schema<RootConfig<Empty>>
  >
}
