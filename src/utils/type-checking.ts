/**
 * Indicates whether the given value is nullish.
 *
 * @param value The unknown value.
 */
export function isNullish(value: unknown): value is undefined | null {
  return value === undefined || value === null;
}

/**
 * Indicates whether the value is Object or not
 *
 * @param value The unknown value.
 */
export function isObject(value: unknown): value is Record<string, unknown> { // TODO: checks this later.
  return typeof value === 'object'; // TODO: more validation need to be added.
}

/**
 * Indicates whether the given value is of the given enumerator.
 *
 * @param value      The unknown value.
 * @param enumerator The enumerator.
 */
export function isEnumValue<T>(value:unknown, enumerator: T): value is T {
  return true; //TODO: Pending to add.
}
