type ObjectWithKey = { [key: string]: any };

export const isArrayUniqueFields = <T extends ObjectWithKey>(
  array: T[],
  field: keyof T,
): boolean => {
  const uniqueValues = new Set<T[keyof T]>();

  for (const obj of array) {
    const value = obj[field];
    if (uniqueValues.has(value)) {
      return false;
    }
    uniqueValues.add(value);
  }

  return true;
};
