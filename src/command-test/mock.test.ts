import { command } from '../command.js'

command(
  'echo',
  {
    version: '1.0.0',
    args: {
      arg1: 'Arg1 Description'
    }
  },
  () => {}
).run(process.argv)
