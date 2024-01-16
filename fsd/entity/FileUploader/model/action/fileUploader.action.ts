"use server";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { writeFile } from "fs/promises";
import { join } from "node:path";
import { IUploaderFilePayload } from "../../type/action.type";
import { FileUploaderResponseErrorEnum } from "../repo/responseError.enum";

export const fileUploader = async (
  data: IUploaderFilePayload,
): Promise<ResponseDataAction<string[] | null>> => {
  try {
    const { fileList, pathToUpload } = data;

    if (!fileList || fileList.length === 0) {
      throw new HttpException(
        FileUploaderResponseErrorEnum.FILE_UPLOADER_NOT_PATHED,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }

    const paths: string[] = [];

    // // Итерируем по каждому файлу в FileList
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(pathToUpload, file.name);
      await writeFile(path, buffer);
      console.log("output_log:  =>>> writed", paths);

      paths.push(path);
    }

    return buildResponse(paths);
  } catch (e) {
    const { error, status } = buildError(e);
    return buildResponse(null, error, status);
  }
};
