export type Logger = {
  error: Console['error']
  warn: Console['warn']
  info: Console['info']
  debug: Console['debug']
  trace: Console['trace']
}
