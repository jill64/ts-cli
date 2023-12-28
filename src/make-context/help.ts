import { Schema } from '../types/context/Schema.js'
import { alignmentArguments } from '../utils/alignmentArguments.js'
import { pickRoute } from '../utils/pickRoute.js'

export const help = <
  T extends Schema,
  R extends keyof T['routes'] & Lowercase<string>
>(
  schema: T,
  route?: R
) => {
  const { name, root, routes } = schema
  const { config } = pickRoute(schema, route)

  const usage = [
    name,
    ...Object.entries(routes)
      .filter(([r]) => (typeof route === 'string' ? r.startsWith(route) : true))
      .map(([r, { config }]) =>
        [
          name,
          r,
          ...alignmentArguments(config.args).map((x) => `<${x}>`),
          ...Object.keys(config.options ?? {}).map((x) => `<${x}?>`),
          ...('rest' in config && config.rest
            ? `<...${config.rest.placeholder}>`
            : [])
        ].join(' ')
      )
  ].join('\n  ')

  const options = Object.entries({
    ...root.config.options,
    ...config.options
  })
    .map(([name, { alias, description }]) =>
      [`-${alias},`, `--${name.padEnd(20)}`, description].join(' ')
    )
    .join('\n  ')

  const codes = Object.entries({
    ...root.config.codes,
    ...config.codes
  })
    .map(([code, message]) => [`${code.padEnd(3)}`, message].join(' '))
    .join('\n  ')

  return `
Usage:
  ${usage}

Options:
  ${options}

Return Codes:
  ${codes}
`
}
