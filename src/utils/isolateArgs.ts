export const isolateArgs = <A, B>(a: A | B, b?: B) => {
  const config = (b ? a : {}) as A
  const handler = (b ?? a) as B

  return {
    config,
    handler
  }
}
