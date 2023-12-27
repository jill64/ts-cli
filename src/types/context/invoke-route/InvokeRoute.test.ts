import { expectTypeOf, test } from 'vitest'
import { Empty } from '../../literal/Empty.js'
import { NormalizedOptions } from '../../util/NormalizedOptions.js'
import { Reserved } from '../../util/Reserved.js'
import { InvokeRoute } from './InvokeRoute.js'

test('Invoke', () => {
  const invoke: InvokeRoute<{
    name: string
    root: {
      config: Reserved<Empty>
      handler: () => void
    }
    routes: {
      foo: {
        config: {
          args: {
            foo: string
          }
          options: {
            bar: {
              alias: 'b'
              type: 'string'
              description: 'bar options'
            }
          }
        }
        handler: () => void
      }
      bar: {
        config: Empty
        handler: () => void
      }
    }
  }> = {
    foo: () => {},
    bar: () => {}
  }

  expectTypeOf<
    NormalizedOptions<{
      bar: {
        alias: 'b'
        type: 'string'
        description: 'bar options'
      }
    }>
  >().toEqualTypeOf<{
    bar: string
  }>()

  invoke.foo({
    args: {
      foo: 'value'
    },
    options: {
      bar: 'value'
    }
  })

  invoke.bar()
})
