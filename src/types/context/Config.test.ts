import { expectTypeOf, test } from 'vitest'
import { Empty } from '../literal/Empty.js'
import { Config } from './Config.js'

test('Match', () => {
  expectTypeOf<Empty>().toMatchTypeOf<Config>()

  expectTypeOf<{
    args: [['test', 'Test Route']]
    options: {
      foo: {
        type: 'string'
        alias: 'f'
        description: 'foo description'
      }
      bar: {
        type: 'string'
        alias: 'b'
        description: 'bar description'
      }
    }
  }>().toMatchTypeOf<Config>()
})

test('No Match', () => {
  expectTypeOf<{
    args: []
    options: {
      foo: {
        type: 'string'
        alias: 'f'
        description: 'foo description'
      }
      bar: {
        type: 'string'
        alias: 'b'
        description: 'bar description'
      }
    }
    optional: Set<string>
    rest: Set<string>
  }>().not.toMatchTypeOf<Config>()
})
