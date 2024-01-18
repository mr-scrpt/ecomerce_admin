import { relative } from "node:path";

export const makePathProjectRelative = (
  absolutePath: string,
  substringToRemove: string,
) => {
  const currentDirectory = process.cwd();

  const relativePath = relative(currentDirectory, absolutePath);

  // Удаление подстроки из относительного пути
  const substringIndex = relativePath.indexOf(substringToRemove);
  const finalPath = `${substringIndex !== -1 ? relativePath.slice(substringIndex + substringToRemove.length) : relativePath}`;

  return finalPath;
};
