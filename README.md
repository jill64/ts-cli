<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/ts-cli


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://npmjs.com/package/@jill64/ts-cli"><img src="https://img.shields.io/npm/v/@jill64/ts-cli" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/ts-cli"><img src="https://img.shields.io/npm/l/@jill64/ts-cli" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/ts-cli"><img src="https://img.shields.io/npm/dm/@jill64/ts-cli" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/ts-cli"><img src="https://img.shields.io/bundlephobia/min/@jill64/ts-cli" alt="npm-min-size" /></a> <a href="https://github.com/jill64/ts-cli/actions/workflows/ci.yml"><img src="https://github.com/jill64/ts-cli/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>
<!----- END GHOST DOCS BADGES ----->


＞ Solidly-Typed CLI Application Builder

<!----- END GHOST DOCS HEADER ----->

## Installation

```sh
npm i @jill64/ts-cli
```

## Example

```js
import { App } from '@jill64/ts-cli'

new App(
  {
    args: [
      ['arg1', 'Argument 1'],
      ['arg2', 'Argument 2'],
      ['arg3', 'Argument 3']
    ],
    options: {
      verbose: {
        alias: 'V',
        description: 'Verbose output'
      },
      host: {
        alias: 'h',
        description: 'Host name',
        type: 'string'
      }
    },
    optional: [
      ['optional-1', 'Optional Argument 1'],
      ['optional-2', 'Optional Argument 2'],
      ['optional-3', 'Optional Argument 3']
    ],
    rest: {
      placeholder: 'rest-argument',
      description: 'Rest Argument'
    },
    codes: {
      0: success,
      1: failure
    }
  },
  ({ args, options, optional, rest }) => {
    // `<command> <arg1> <arg2> <arg3> [options] [optional1?] [optional2?] [optional3?] <...rest>`

    options.verbose // boolean
    options.host // string

    // Allow 0 or 1 or void
    return 0
  }
)
```

## Add Route (Subcommands)

The `add` function defines a route.

> [!NOTE]  
> Root `options` and `codes` are inherited by all route.

```js
import { App } from '@jill64/ts-cli'

new App(/* ... */)
  .add(
    'test',
    {
      // Config
    },
    () => {
      // `<command> test`
      // ...
    }
  )
  .add(
    'test start',
    {
      // Config
    },
    () => {
      // `<command> test start`
      // ...
    }
  )
```

## Run as Command

The `run` function executes the command immediately using `process.argv`.

```js
import { App } from '@jill64/ts-cli'
import process from 'node:process'

new App(/* ... */).run(process.argv)
```

## Export as API

```js
// index.js
import { App } from '@jill64/ts-cli'

export const { execute, invoke } = new App(/* ... */)
  .add(/* ... */)
  .add(/* ... */)
```

```js
import { invoke } from 'index.js'

// `example`
execute({
  args: {
    arg1: 'value1',
    arg2: 'value2',
    arg3: 'value3'
  },
  optional: {
    'optional-1': 'optional-value1',
    'optional-2': 'optional-value2',
    'optional-3': 'optional-value3'
  },
  // or
  // rest: ['rest1', 'rest2', 'rest3'],
  options: {
    verbose: true,
    host: 'example.com'
  }
})

// `example test`
invoke('test', {
  // ...
})

// `example test start`
invoke('test start', {
  // ...
})
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
