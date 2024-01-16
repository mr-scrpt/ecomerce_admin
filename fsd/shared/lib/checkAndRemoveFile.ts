import { access, unlink } from "node:fs/promises";

export const checkAndRemoveFile = async (
  pathToCreate: string,
): Promise<void> => {
  try {
    await access(pathToCreate);
    await unlink(pathToCreate);
    console.log("output_log:  =>>> file has been removed");
  } catch (error) {
    console.log("output_log:  =>>> file not exist");
  }
};
