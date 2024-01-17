import { access, rm } from "node:fs/promises";

export const checkAndRemoveDir = async (
  pathToRemove: string,
): Promise<void> => {
  try {
    await access(pathToRemove);
    await rm(pathToRemove, { recursive: true });
    console.log("output_log:  =>>> folder has been removed");
  } catch (error) {
    console.log("output_log:  =>>> folder not exist");
  }
};
