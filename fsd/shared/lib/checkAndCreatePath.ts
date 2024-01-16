import { access, mkdir } from "node:fs/promises";

export const checkAndCreatePath = async (
  pathToCreate: string,
): Promise<void> => {
  try {
    await access(pathToCreate);
  } catch (error) {
    await mkdir(pathToCreate, { recursive: true });
  }
};
