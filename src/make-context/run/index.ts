import { exit } from 'process'
import { Schema } from '../../types/context/Schema.js'
import { RunCommand } from '../../types/literal/RunCommand.js'
import { pickRoute } from '../../utils/pickRoute.js'
import { proxy } from '../proxy.js'
import { extractParam } from './extractParam.js'
import { matchRoute } from './matchRoute.js'

const finish = (result: unknown) => {
  if (typeof result === 'number') {
    exit(result)
  }
}

export const run = <T extends Schema>(schema: T): RunCommand => {
  const match = matchRoute(schema.routes)
  const exec = proxy(schema)

  return (argv) => {
    const [, , ...args] = argv

    const route = match(args)

    const { config } = pickRoute(schema, route)

    const param = extractParam(config, args)

    const result = exec(route)(param)

    if (result instanceof Promise) {
      result.then(finish)
    } else {
      finish(result)
    }
  }
}
