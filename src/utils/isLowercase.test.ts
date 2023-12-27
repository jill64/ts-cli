import { expect, test } from 'vitest'
import { isLowercase } from './isLowercase.js'

test('isLowercase', () => {
  expect(isLowercase('')).toBe(true)
  expect(isLowercase('a ')).toBe(true)
  expect(isLowercase('A')).toBe(false)
  expect(isLowercase('1')).toBe(true)
  expect(isLowercase('a-1')).toBe(true)
})
