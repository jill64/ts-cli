import { test } from 'vitest'
import { command } from '../command.js'

test('command', () => {
  const ctx = command(
    'example',
    {
      args: [['arg1', 'arg1 description']],
      options: {
        'root-option': {
          alias: 'r',
          type: 'string',
          description: 'root option description'
        }
      }
    },
    ({ args: { arg1 }, logger }) => {
      logger.info(arg1)
    }
  )

  const cmd = ctx
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
      ({ logger, args, options }) => {
        args.arg2
        options?.['root-option']
        logger.info('test')
      }
    )
    .add('test start', () => {
      console.log('test start')
    })

  cmd.execute({
    args: {
      arg1: 'value'
    },
    options: {
      help: true,
      'root-option': 'value'
    }
  })

  cmd.invoke.test({
    args: {
      arg2: 'value'
    },
    options: {
      help: true,
      'root-option': 'value',
      'test-option': 'value'
    }
  })

  cmd.invoke['test start']()

  cmd.invoke['test start']({
    options: {
      help: true
    }
  })

  cmd.run(process.argv)
})
