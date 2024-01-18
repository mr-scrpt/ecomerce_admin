import { access, rename } from "node:fs/promises";

export const checkAndRename = async (
  pathFrom: string,
  pathTo: string,
): Promise<void> => {
  try {
    await access(pathFrom);
    await access(pathTo);
    await rename(pathFrom, pathTo);
  } catch (error) {
    console.log("output_log:  =>>> folder not been renamed");
  }
};
