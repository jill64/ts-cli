import { describe, expect, it } from 'bun:test'
import { App } from '../App.js'

describe('rest', () => {
  it('with args', () =>
    new App(
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
    new App(
      {
        options: {
          short: {
            alias: 's',
            type: 'boolean',
            description: 'short option'
          }
        },
        rest: {
          placeholder: 'rest',
          description: 'rest'
        }
      },
      ({ options, rest }) => {
        expect(options).toEqual({ short: true })
        expect(rest).toEqual(['rest', '--rest-option'])
      }
    ).run(['', '', '-s', 'rest', '--rest-option']))

  it('rest route', () =>
    new App({}, () => {})
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
