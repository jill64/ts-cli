import { expectTypeOf, test } from 'vitest'
import { InvokeParam } from './InvokeParam.js'

test('InvokeParam', () => {
  expectTypeOf<
    InvokeParam<{
      args: {
        foo: string
      }
    }>
  >().toMatchTypeOf<{
    args: {
      foo: string
    }
  }>()

  expectTypeOf<
    InvokeParam<{
      args: {
        foo: string
      }
      options: {
        bar: {
          alias: 'b'
          type: 'string'
          description: 'bar option'
        }
      }
    }>
  >().toMatchTypeOf<{
    args: {
      foo: string
    }
    options?: {
      bar?: string
    }
  }>()

  const param: InvokeParam<{
    args: {
      foo: string
    }
    options: {
      bar: {
        alias: 'b'
        type: 'boolean[]'
        description: 'bar option'
      }
    }
  }> = {
    args: {
      foo: 'value'
    },
    options: {
      bar: [true]
    }
  }

  expectTypeOf(param.args.foo).toEqualTypeOf<string>()
  expectTypeOf(param.options?.bar).toEqualTypeOf<boolean[] | undefined>()
})
