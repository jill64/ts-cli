import { expectTypeOf, test } from 'vitest'
import { NormalizedArguments } from './NormalizedArguments.js'

test('NormalizedArguments', () => {
  expectTypeOf<
    NormalizedArguments<
      Map<'foo' | 'bar', 'foo description' | 'bar description'>
    >
  >().toEqualTypeOf<{
    foo: string
    bar: string
  }>()

  expectTypeOf<
    NormalizedArguments<
      ['foo' | 'bar', 'foo description' | 'bar description'][]
    >
  >().toEqualTypeOf<{
    foo: string
    bar: string
  }>()

  expectTypeOf<
    NormalizedArguments<
      [['foo', 'foo description'], ['bar', 'bar description']]
    >
  >().toEqualTypeOf<{
    foo: string
    bar: string
  }>()

  expectTypeOf<
    NormalizedArguments<{
      list: ['foo', 'bar']
      description: {
        foo: 'foo description'
        bar: 'bar description'
      }
    }>
  >().toEqualTypeOf<{
    foo: string
    bar: string
  }>()

  expectTypeOf<NormalizedArguments<Record<string, string>>>().toEqualTypeOf<
    Record<string, string>
  >()

  expectTypeOf<
    NormalizedArguments<{
      foo: 'foo description'
      bar: 'bar description'
    }>
  >().toEqualTypeOf<{
    foo: string
    bar: string
  }>()
})
