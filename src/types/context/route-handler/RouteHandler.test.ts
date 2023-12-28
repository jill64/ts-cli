import { expectTypeOf, test } from 'vitest'
import { Empty } from '../../literal/Empty.js'
import { Logger } from '../../literal/Logger.js'
import { RouteHandler } from './RouteHandler.js'

test('RouteHandler', () => {
  ;((param) => {
    expectTypeOf(param.logger).toMatchTypeOf<Logger>()
  }) satisfies RouteHandler<Empty>
  ;((param) => {
    expectTypeOf(param.args).toMatchTypeOf<{
      foo: string
      bar: string
    }>()

    expectTypeOf(param.logger).toMatchTypeOf<Logger>()

    expectTypeOf(param.options).toMatchTypeOf<
      | {
          foo?: string
        }
      | undefined
    >()
  }) satisfies RouteHandler<{
    args: [['foo', 'Route Foo'], ['bar', 'Route Bar']]
    options: {
      foo: {
        alias: 'f'
        description: 'Foo option'
        type: 'string'
      }
    }
  }>
})
