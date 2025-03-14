import { describe, expect, test } from 'bun:test'
import { App } from '../App.js'

test('args', () => {
  const cmd = new App(
    {
      args: [
        ['arg1', 'Argument 1'],
        ['arg2', 'Argument 2'],
        ['arg3', 'Argument 3']
      ] as const
    },
    ({ args }) => {
      expect(args.arg1).toBe('value1')
      expect(args.arg2).toBe('value2')
      expect(args.arg3).toBe('value3')
    }
  )

  cmd.execute({
    args: {
      arg1: 'value1',
      arg2: 'value2',
      arg3: 'value3'
    }
  })

  cmd.run(['', '', 'value1', 'value2', 'value3'])
})

test('options', () => {
  const cmd = new App(
    {
      options: {
        foo: {
          alias: 'f',
          description: 'Boolean flag'
        },
        bar: {
          alias: 'b',
          description: 'String Option',
          type: 'string'
        }
      }
    },
    ({ options }) => {
      expect(options?.foo).toBe(true)
      expect(options?.bar).toBe('value')
    }
  )

  cmd.execute({
    options: {
      foo: true,
      bar: 'value'
    }
  })

  cmd.run(['', '', '--foo', '-b', 'value'])
})

test('optional', () => {
  const cmd = new App(
    {
      optional: [
        ['optional-1', 'Optional Argument 1'],
        ['optional-2', 'Optional Argument 2'],
        ['optional-3', 'Optional Argument 3']
      ] as const
    },
    ({ optional }) => {
      expect(optional?.['optional-1']).toBe('value1')
      expect(optional?.['optional-2']).toBe('value2')
      expect(optional?.['optional-3']).toBe('value3')
    }
  )

  cmd.execute({
    optional: {
      'optional-1': 'value1',
      'optional-2': 'value2',
      'optional-3': 'value3'
    }
  })

  cmd.run(['', '', 'value1', 'value2', 'value3'])
})

describe('rest', () => {
  const cmd = new App(
    {
      rest: {
        placeholder: 'rest-arg',
        description: 'Rest Argument'
      }
    },
    ({ rest }) => {
      expect(rest).toEqual(['rest-1', 'rest-2', 'rest-3'])
    }
  )

  test('execute', () => {
    cmd.execute({
      rest: ['rest-1', 'rest-2', 'rest-3']
    })
  })

  test('run', () => {
    cmd.run(['', '', 'rest-1', 'rest-2', 'rest-3'])
  })
})
