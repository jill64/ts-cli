import { expect, test } from 'vitest'
import { App } from '../App.js'

test('add-routes', () => {
  let fired = [0, 0, 0]

  const cmd = new App({}, () => {
    fired[0] += 1
  })
    .add('test', {}, () => {
      fired[1] += 1
    })
    .add('test start', {}, () => {
      fired[2] += 1
    })

  cmd.run(['', '', ''])
  cmd.execute({})
  cmd.invoke('test', {})
  cmd.invoke('test start', {})
  cmd.run(['', '', 'test'])
  cmd.run(['', '', 'test', 'start'])

  expect(fired).toEqual([2, 2, 2])
})
