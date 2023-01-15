export const deserializeRecursively =
  (replacer: Function) =>
  (object: any): any =>
    Array.isArray(object)
      ? object.map(deserializeRecursively(replacer))
      : Object(object) === object
      ? Object.fromEntries(
          Object.entries(object).map(([key, value]) => [
            replacer(key),
            deserializeRecursively(replacer)(value),
          ])
        )
      : object;
