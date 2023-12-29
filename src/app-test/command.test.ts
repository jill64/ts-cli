import { describe } from 'node:test'
import { expect, test } from 'vitest'
import { App } from '../App.js'

describe('command-e2e', () => {
  let fired = [0, 0, 0]

  const cmd = new App(
    {
      args: [['arg1', 'arg1 description'] as const],
      options: {
        'root-option': {
          alias: 'r',
          type: 'string',
          description: 'root option description'
        }
      }
    },
    ({ args: { arg1 }, options }, config) => {
      test('root', () => {
        expect(config).toEqual({
          args: [['arg1', 'arg1 description'] as const],
          options: {
            'root-option': {
              alias: 'r',
              type: 'string',
              description: 'root option description'
            }
          }
        })
        expect(arg1).toBe('arg1-value')
        expect(options?.['root-option']).toBe('root-option-value')
      })
      fired[0] += 1
    }
  )
    .add(
      'test',
      {
        args: [['arg2', 'arg2 description']],
        options: {
          'test-option': {
            alias: 't',
            type: 'string',
            description: 'test option description'
          }
        }
      },
      ({ args, options }) => {
        test('test route', () => {
          expect(args.arg2).toBe('arg2-value')
          expect(options?.['test-option']).toBe('test-option-value')
        })
        fired[1] += 1
      }
    )
    .add('test start', {}, () => {
      fired[2] += 1
    })

  cmd.execute({
    args: {
      arg1: 'arg1-value'
    },
    options: {
      'root-option': 'root-option-value'
    }
  })

  cmd.run(['', '', 'arg1-value', '-r', 'root-option-value'])

  cmd.invoke.test({
    args: {
      arg2: 'arg2-value'
    },
    options: {
      'test-option': 'test-option-value'
    }
  })

  cmd.run([
    '',
    '',
    'test',
    '--root-option',
    'root-option-value',
    'arg2-value',
    '-t',
    '--test-option-value'
  ])

  cmd.invoke['test start']({})

  cmd.run(['', '', '-V', 'test', '--quiet', 'start'])

  test('result', () => {
    expect(fired).toEqual([2, 2, 2])
  })
})
