import { version } from '../../package.json' assert { type: 'json' }
import { command } from '../command.js'

command(
  'echo',
  {
    version,
    args: {
      arg1: 'Arg1 Description'
    }
  },
  () => {}
).run(process.argv)
