import { access, unlink } from "node:fs/promises";

export const checkAndRemoveFile = async (
  pathToCreate: string,
): Promise<void> => {
  try {
    await access(pathToCreate);
  } catch (error) {
    await unlink(pathToCreate);
  }
};
