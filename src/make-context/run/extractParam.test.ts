import { describe, expect, test } from 'vitest'
import { extractParam } from './extractParam.js'

describe('extractParam', () => {
  test('base', () => {
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
      rest: []
    })
  })

  test('with-rest', () => {
    const config = {
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
      },
      rest: {
        placeholder: 'rest',
        description: 'rest'
      }
    } as const

    expect(extractParam(config, ['John', '20', '--dry-run'])).toEqual({
      args: {
        name: 'John',
        age: '20'
      },
      optional: {},
      options: {
        'dry-run': true
      },
      rest: []
    })

    expect(
      extractParam(config, ['John', '20', 'rest', 'args', '--opt', '-d'])
    ).toEqual({
      args: {
        name: 'John',
        age: '20'
      },
      optional: {},
      options: {},
      rest: ['rest', 'args', '--opt', '-d']
    })
  })
})
