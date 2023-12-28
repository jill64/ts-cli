import { expectTypeOf, test } from 'vitest'
import { IsEmptyConfig } from './IsEmptyConfig.js'

test('IsEmptyConfig', () => {
  expectTypeOf<IsEmptyConfig<Record<string, never>>>().toEqualTypeOf<true>()
  expectTypeOf<
    IsEmptyConfig<{
      args: {
        foo: string
      }
    }>
  >().toEqualTypeOf<false>()
})
