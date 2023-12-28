import { expectTypeOf, test } from 'vitest'
import { Empty } from '../../literal/Empty.js'
import { Reserved } from '../../util/Reserved.js'
import { InvokeHandler } from './InvokeHandler.js'

test('Execute', () => {
  expectTypeOf<
    InvokeHandler<
      Reserved<Empty> & {
        args: {
          arg1: string
        }
      }
    >
  >().toMatchTypeOf<(param: { args: { arg1: string } }) => void>()

  expectTypeOf<
    InvokeHandler<
      Reserved<Empty> & {
        args: {
          arg1: string
        }
      }
    >
  >().not.toMatchTypeOf<() => void>()
})
