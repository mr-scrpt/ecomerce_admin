type ArrayWithLength = { length: number };

export const longestArray = <T extends ArrayWithLength>(...arrays: T[]): T => {
  return arrays.reduce(
    (maxArray, currentArray) =>
      currentArray.length > maxArray.length ? currentArray : maxArray,
    arrays[0],
  );
};
