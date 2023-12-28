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
    }
  })

  test('Empty', () => {
    const empty = match([])
    expect(empty).toEqual(undefined)

    const emptyStr = match([''])
    expect(emptyStr).toEqual(undefined)
  })

  test('help', () => {
    const help = match(['--help'])
    expect(help).toEqual(undefined)
  })

  test('invalidRoute', () => {
    const invalidRoute = match(['invalid route'])
    expect(invalidRoute).toEqual(undefined)
  })

  test('route', () => {
    const route = match(['-v', 'route'])
    expect(route).toEqual('route')
  })

  test('test route', () => {
    const route = match(['-v', 'test', 'route'])
    expect(route).toEqual('test route')
  })
})
