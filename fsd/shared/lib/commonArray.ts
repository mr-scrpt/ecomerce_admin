type ObjectWithKey = { [key: string]: any };

export const commonArray = <T extends ObjectWithKey, K extends keyof T>(
  array1: T[],
  array2: T[],
  key: K,
): T[] => {
  const commonKeys = array1
    .filter((obj1) => array2.some((obj2) => obj1[key] === obj2[key]))
    .map((obj) => obj[key]);

  return array1.filter((obj) => commonKeys.includes(obj[key]));
};
