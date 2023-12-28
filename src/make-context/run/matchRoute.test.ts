import { describe } from 'node:test'
import { expect, test } from 'vitest'
import { matchRoute } from './matchRoute.js'

describe('matchRoute', () => {
  const config = {
    args: {
      foo: 'Foo Arg Description'
    }
  }

  const match = matchRoute({
    route: {
      config,
      handler: () => {}
    },
    ['test route']: {
      config,
      handler: () => {}
    },
    ['test start']: {
      config,
      handler: () => {}
    }
  })

  test('Empty', () => {
    expect(match([])).toEqual(undefined)
    expect(match([''])).toEqual(undefined)
  })

  test('help', () => {
    expect(match(['--help'])).toEqual(undefined)
  })

  test('invalidRoute', () => {
    expect(match(['invalid route'])).toEqual(undefined)
  })

  test('route', () => {
    expect(match(['-v', 'route'])).toEqual('route')
  })

  test('test route', () => {
    expect(match(['-v', 'test', 'route'])).toEqual('test route')
  })

  test('test start', () => {
    expect(match(['-V', 'test', '--quiet', 'start'])).toEqual('test start')
  })
})
