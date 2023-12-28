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
    test: {
      config,
      handler: () => {}
    },
    ['test route']: {
      config,
      handler: () => {}
    },
    ['test route start']: {
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

  test('test', () => {
    expect(match(['test', '-v'])).toEqual('test')
    expect(match(['-v', 'test'])).toEqual(undefined)
  })

  test('test route', () => {
    expect(match(['test', 'route', '-v', 'start'])).toEqual('test route')
    expect(match(['-v', 'test', 'route'])).toEqual(undefined)
  })

  test('test route start', () => {
    expect(match(['test', 'route', 'start', '--quiet'])).toEqual(
      'test route start'
    )
    expect(match(['-V', 'test', 'route', 'start'])).toEqual(undefined)
    expect(match(['-V', 'test', '--quiet', 'route', 'start'])).toEqual(
      undefined
    )
  })
})
