import { access, mkdir, unlink } from "node:fs/promises";

export const checkAndCrearPath = async (
  pathToCreate: string,
): Promise<void> => {
  try {
    await access(pathToCreate);
    await unlink(pathToCreate);
    await mkdir(pathToCreate, { recursive: true });
  } catch (error) {
    await mkdir(pathToCreate, { recursive: true });
  }
};
