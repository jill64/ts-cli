import { Config } from '../types/Config.js'
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

  const generateUsage = (config: Config, route?: string) =>
    [
      name,
      route,
      '(options)',
      ...alignmentArguments(config.args).map((x) => `<${x}>`),
      ...Object.keys('optional' in config ? config.optional ?? {} : {}).map(
        (x) => `<${x}?>`
      ),
      ...('rest' in config && config.rest
        ? `<...${config.rest.placeholder}>`
        : [])
    ]
      .filter((x) => x)
      .join(' ')

  const usage = [
    generateUsage(root.config),
    ...Object.entries(routes)
      .filter(([r]) => (typeof route === 'string' ? r.startsWith(route) : true))
      .map(([r, { config }]) => generateUsage(config, r))
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
    .map(([code, message]) => [code.padEnd(3), message].join(' '))
    .join('\n  ')

  return [
    usage.trim() ? `Usage:\n  ${usage}` : '',
    options.trim() ? `Options:\n  ${options}` : '',
    codes.trim() ? `Return Codes:\n  ${codes}` : ''
  ]
    .join('\n\n')
    .trim()
}
