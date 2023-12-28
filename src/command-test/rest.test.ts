import { describe, expect, it } from 'vitest'
import { command } from '../command.js'

describe('rest', () => {
  it('with args', () =>
    command(
      'rest',
      {
        args: [
          ['arg1', 'arg1 description'],
          ['arg2', 'arg2 description']
        ],
        rest: {
          placeholder: 'rest',
          description: 'rest'
        }
      },
      ({ args, rest }) => {
        expect(args).toEqual({
          arg1: 'arg1-value',
          arg2: 'arg2-value'
        })
        expect(rest).toEqual(['-s', 'rest', '--rest-option'])
      }
    ).run(['', '', 'arg1-value', 'arg2-value', '-s', 'rest', '--rest-option']))

  it('rest', () =>
    command(
      'rest',
      {
        rest: {
          placeholder: 'rest',
          description: 'rest'
        }
      },
      ({ rest }) => {
        expect(rest).toEqual(['-s', 'rest', '--rest-option'])
      }
    ).run(['', '', '-s', 'rest', '--rest-option']))

  it('rest route', () =>
    command('rest', () => {})
      .add(
        'rest route',
        {
          args: [
            ['arg1', 'arg1 description'],
            ['arg2', 'arg2 description']
          ],
          rest: {
            placeholder: 'rest',
            description: 'rest'
          }
        },
        ({ args, rest }) => {
          expect(args).toEqual({
            arg1: 'arg1-value',
            arg2: 'arg2-value'
          })
          expect(rest).toEqual(['-s', 'rest', '--rest-option'])
        }
      )
      .run([
        '',
        '',
        'rest',
        'route',
        'arg1-value',
        'arg2-value',
        '-s',
        'rest',
        '--rest-option'
      ]))
})
