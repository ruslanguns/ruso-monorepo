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
