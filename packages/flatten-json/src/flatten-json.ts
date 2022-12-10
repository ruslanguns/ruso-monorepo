/**
 * FlattenJSON is a utility function for flattening JSON objects
 * into a single-level object with keys representing the accessor path to the value.
 *
 * To use `FlattenJSON`, pass a JSON object as the first argument.
 * The function will return a flattened version of the input object,
 * with keys representing the accessor path to the value.
 *
 * @example
 * ```ts
 * import { flattenJSON } from '@ruso/flatten-json';
 *
 * const json = {
 *   numbers: [1, 2, 3],
 *   person: {
 *     name: 'Ruslan',
 *     hobbies: ['programming', 'music']
 *   }
 * };
 *
 * const flattenedJSON = flattenJSON(json);
 *
 * console.log(flattenedJSON);
 * ```
 * Output:
 * ```js
 * {
 *   "numbers[0]": 1,
 *   "numbers[1]": 2,
 *   "numbers[2]": 3,
 *   "person.name": "Ruslan",
 *   "person.hobbies[0]":
 *   "programming",
 *   "person.hobbies[1]": "music"
 * }
 * ```
 *
 * @param json JSON object
 * @returns A flattened object of key-value pair
 */
export default function flattenJSON(json: unknown): Record<string, any> {
  if (!json || typeof json !== 'object') return {};

  return (function flat(
    json: unknown,
    keyPath = '',
    result: { [key: string]: any } = {},
  ) {
    const separator = ' |####| ';

    for (const [key, value] of Object.entries(json)) {
      const newKeyPath = keyPath ? [keyPath, separator, key].join('') : key;

      if (typeof value === 'object') {
        flat(value, newKeyPath, result);
      } else {
        result[newKeyPath] = value;
      }
    }

    return Object.entries(result).reduce((prev, [key, value]) => {
      const parsedAccessor = key
        .split(separator)
        .map((k) => {
          if (Number.isInteger(Number(k))) {
            return `[${k}]`;
          } else {
            return k;
          }
        })
        .join('.')
        .replace('.[', '[');

      return {
        ...prev,
        [parsedAccessor]: value,
      };
    }, {});
  })(json);
}
