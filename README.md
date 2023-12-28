<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/ts-cli

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://github.com/jill64/ts-cli/actions/workflows/ci.yml"><img src="https://github.com/jill64/ts-cli/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>

<!----- END GHOST DOCS BADGES ----->

＞ Easy Node CLI creation with opinionated POSIX-like defaults

<!----- END GHOST DOCS HEADER ----->

## Features

- ✅ Declaratively Self-Documented Source of Truth.

  - Route definition (Sub Command)
  - Argument
  - Exit code
  - Option (Short option, Long option)
  - Optional argument
  - Rest argument
  - Root definitions + route-specific definitions

- ✅ Type-Safety

  - Schema-constrained command route handler
  - Generation of CLI and API with common definitions

- ✅ Opinionated
  - All options require a short version
  - POSIX-compliant exit code
  - Default option handle
  - Pre-built loggers

## Installation

```sh
npm i @jill64/ts-cli
```

## Minimum Start

The `command` function defines a single CLI command and serves as the root for all other subcommands.

```js
import { command } from '@jill64/ts-cli'

command('example', () => {
  // It is executed as a handler when the command is invoked.
})
```

### Auto Generated Help

Out of box, help is always generated automatically.  
Also, if the command has a help option (`-h`, `--help`), it will display help and exit. (No handler is executed).
Help is automatically added as you add more schemas.

## Define Schema

### Version

This value is used to display the version of the command (`-v`, `--version`).

> [!NOTE]  
> If this value is set, handler functions will not be executed when the `--version` and `-v` options are specified.

```js
import { command } from '@jill64/ts-cli'

command(
  'example',
  {
    version: '1.0.0'
  },
  () => {
    // ...
  }
)
```

### Positional Arguments

The `args` property of the command definition is used to define positional arguments.

```js
import { command } from '@jill64/ts-cli'

command(
  'example',
  {
    args: [
      ['arg1', 'Argument 1'],
      ['arg2', 'Argument 2'],
      ['arg3', 'Argument 3']
    ]
  },
  ({ args }) => {
    // `example <arg1> <arg2> <arg3>`

    // [arg1, arg2, arg3]
    args
  }
)
```

### Options

Defines options that can be specified when executing the command.  
These have their own limitations

- All options require a single alphanumeric abbreviation as the key to the object.
- All options must specify default values and be optional.
- Only lowercase alphanumeric characters and `-` are allowed in option names.

> [!TIP]
> Some of these restrictions are found in [POSIX Utility Conventions](https://pubs.opengroup.org/onlinepubs/9699919799/) and [POSIX Rationale Utility Conventions](https://pubs.opengroup.org/onlinepubs/9699919799/).

```js
import { command } from '@jill64/ts-cli'

command(
  'example',
  {
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
    }
  },
  ({ options }) => {
    options.verbose // boolean
    options.host // string
  }
)
```

### Optional Arguments

The `optional` property of the command definition is used to define optional arguments.

```js
import { command } from '@jill64/ts-cli'

command(
  'example',
  {
    optional: [
      ['optional-1', 'Optional Argument 1'],
      ['optional-2', 'Optional Argument 2'],
      ['optional-3', 'Optional Argument 3']
    ]
  },
  ({ optional }) => {
    // [optional 1, optional 2, optional 3]
    optional
  }
)
```

### Rest Arguments

Edge cases must accept arguments of variable length.
This can be accomplished using the `rest` property.

```js
import { command } from '@jill64/ts-cli'

command(
  'example',
  {
    rest: {
      placeholder: 'rest-argument',
      description: 'Rest Argument'
    }
  },
  ({ rest }) => {
    // [...]
    rest
  }
)
```

> [!NOTE]  
> `rest` and `optional` are exclusive.  
> Only one of them may be specified for a single route.

### Subcommands

The `add` function defines a subcommand.

> [!NOTE]  
> Root `options` are inherited by all subcommands.

```js
import { command } from '@jill64/ts-cli'

command('example', () => {
  // ...
})
  .add('test', () => {
    // `example test`
    // ...
  })
  .add(
    'test start',
    {
      // ...
    },
    () => {
      // `example test start`
      // ...
    }
  )
```

## Execution

### Run a command

The `run` function executes the command immediately using `process.argv`.

```js
import { command } from '@jill64/ts-cli'
import process from 'node:process'

command('example', () => {
  // ...
}).run(process.argv)
```

### Export as API

Occasionally, you may need an API that has the same options as the CLI.  
In this case, you can export it as an API and use it, keeping it type-safe and portable.

```js
// index.js
import { command } from '@jill64/ts-cli'

export const { execute, invoke } = command('example', () => {
  // `example`
  // ...
})
  .add('test', () => {
    // `example test`
    // ...
  })
  .add('test start', () => {
    // `example test start`
    // ...
  })
```

```js
import { execute, invoke } from 'index.js'

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
invoke.test({
  // ...
})

// `example test start`
invoke.['test start']({
  // ...
})
```

## Exit Code

In some cases, a custom exit code may be required.  
These can also be defined together to add verification and documentation of the exit code.

- The range of the exit code is an integer from 0 to 255.
- If no exit code is specified, the return value is automatically set by node.

```js
import { command } from '@jill64/ts-cli'

command(
  'example',
  {
    codes: {
      0: success,
      1: failure
    }
  },
  () => {
    // ...

    // Allow 0 or 1 or void
    return 0
  }
)
```

## Logger

The output content of this logger is automatically controlled by the log level options entered.

|             |             | Level                                     |
| ----------- | ----------- | ----------------------------------------- |
| `-s`        | `--silent`  | - (None)                                  |
| `-q`        | `--quiet`   | `ERROR`                                   |
| - (default) | - (default) | `WARN`, `ERROR`                           |
| `-V`        | `--verbose` | `INFO`, `WARN`, `ERROR`                   |
| `-d`        | `--debug`   | `DEBUG`, `INFO`, `WARN`, `ERROR`          |
| `-t`        | `--trace`   | `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR` |

```js
import { command } from '@jill64/ts-cli'

command('example', ({ logger }) => {
  logger.error('ERROR')
  logger.warn('WARN')
  logger.info('INFO')
  logger.debug('DEBUG')
  logger.trace('TRACE')
})
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
