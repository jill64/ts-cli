import { ParseArgsConfig } from 'util'

export type ParseArgsOptionConfig = NonNullable<
  ParseArgsConfig['options']
> extends Record<string, infer U>
  ? U
  : never
