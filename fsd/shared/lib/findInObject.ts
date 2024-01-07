type ObjectWithKey = { [key: string]: any };

export const findInObject = <T extends ObjectWithKey>(
  array: T[],
  field: keyof T,
  targetValue: T[keyof T],
): T | undefined => {
  return array.find((obj) => obj[field] === targetValue);
};
