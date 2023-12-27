import { expect, test } from 'vitest'
import { alignmentArguments } from './alignmentArguments.js'

test('alignmentArguments', () => {
  expect(alignmentArguments()).toEqual([])
  expect(alignmentArguments([])).toEqual([])
  expect(alignmentArguments(new Map())).toEqual([])
  expect(alignmentArguments([['a', '']])).toEqual(['a'])
  expect(
    alignmentArguments([
      ['a', ''],
      ['b', '']
    ])
  ).toEqual(['a', 'b'])
})
