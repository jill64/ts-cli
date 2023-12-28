import { expect, test } from 'vitest'
import { command } from '../command.js'

test('min', () => {
  let called = false

  command('example', () => {
    called = true
  }).run([])

  expect(called).toBe(true)

  expect(command('example', () => 0).execute()).toBe(0)
  expect(command('example', () => 2).execute()).toBe(2)
})

test('help', () => {
  const cmd = command('command', () => {
    throw new Error('Should not be called')
  })

  cmd.run(['', '', '-h'])
  cmd.run(['', '', '--help'])

  cmd.execute({
    options: {
      help: true
    }
  })
})
