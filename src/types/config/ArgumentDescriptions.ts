export type ArgumentDescriptions<T extends string[] = string[]> =
  /**
   * @example
   * new Map([
   *   ['foo', 'foo description'],
   *   ['bar', 'bar description']
   * ])
   */
  | Map<T[number], string>

  /**
   * @example
   * [
   *   ['foo', 'foo description'],
   *   ['bar', 'bar description']
   * ]
   */
  | [T[number], string][]
  | {
      /**
       * Argument List
       * @example ['foo', 'bar']
       */
      list: T

      /**
       * Argument Description
       * @example
       * {
       *   foo: 'foo description',
       *   bar: 'bar description'
       * }
       */
      description: {
        [K in T[number]]: string
      }
    }
  | {
      /**
       * **Not Recommended.**
       * Object key order is not guaranteed.
       * @example
       * {
       *   foo: 'foo description',
       *   bar: 'bar description'
       * }
       */
      [K in T[number]]: string
    }
