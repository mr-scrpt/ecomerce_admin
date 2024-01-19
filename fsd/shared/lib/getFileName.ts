export const getFileName = (path: string): string =>
  path.split("/").pop() || "";
