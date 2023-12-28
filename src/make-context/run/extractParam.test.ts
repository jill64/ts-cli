import { expect, test } from 'vitest'
import { extractParam } from './extractParam.js'

test('extractParam', () => {
  const result = extractParam(
    {
      args: {
        name: 'string',
        age: 'number'
      },
      options: {
        'dry-run': {
          alias: 'd',
          type: 'boolean',
          description: 'Dry run'
        }
      }
    },
    ['John', '20', '--dry-run']
  )

  expect(result).toEqual({
    args: {
      name: 'John',
      age: '20'
    },
    options: {
      'dry-run': true
    },
    optional: {},
    rest: {}
  })
})
