import { expectTypeOf, test } from 'vitest'
import { InvokeHandler } from './InvokeHandler.js'

test('InvokeHandler', () => {
  ;((param) => {
    expectTypeOf(param.args).toMatchTypeOf<{
      foo: string
      bar: string
    }>()

    expectTypeOf(param.options).toMatchTypeOf<
      | {
          foo?: string
        }
      | undefined
    >()
  }) satisfies InvokeHandler<{
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
