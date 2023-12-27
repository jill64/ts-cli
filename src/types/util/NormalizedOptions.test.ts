import { expectTypeOf, test } from 'vitest'
import { NormalizedOptions } from './NormalizedOptions.js'

test('NormalizedOptions', () => {
  expectTypeOf<NormalizedOptions<undefined>>().toEqualTypeOf<undefined>()

  expectTypeOf<
    NormalizedOptions<{
      help: {
        alias: 'h'
        description: 'Show help'
      }
    }>
  >().toEqualTypeOf<{
    help: boolean
  }>()

  expectTypeOf<
    NormalizedOptions<{
      'bool-array': {
        alias: 'f'
        description: 'foo description'
        type: 'string[]'
      }
      foo: {
        alias: 'f'
        description: 'foo description'
        type: 'string[]'
      }
      bar: {
        alias: 'b'
        description: 'bar description'
        type: 'string'
      }
    }>
  >().toEqualTypeOf<{
    'bool-array': string[]
    foo: string[]
    bar: string
  }>()
})
