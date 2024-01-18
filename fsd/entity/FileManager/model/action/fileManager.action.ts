"use server";

import { checkAuthUser } from "@/fsd/shared/model";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { cache } from "react";
import { IUploadFileListPayload } from "../../type/action.type";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { buildError } from "@/fsd/shared/lib/buildError";
import {
  PATH_PUBLIC_GARBAGE,
  PATH_PUBLIC_TMP,
} from "../../type/fileManagerPath.const";
import { join } from "node:path";
import slugify from "slugify";

export const uploadeFileList = cache(
  async (
    data: IUploadFileListPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<null>> => {
    try {
      const { fileList, name, entity } = data;

      await checkAuthUser(checkAuth);

      const folderName = name ? slugify(name) : null;
      const folderEntity = entity ? slugify(entity) : null;

      const pathFolderDest = join(
        folderEntity && folderName
          ? join(PATH_PUBLIC_TMP, folderEntity, folderName)
          : PATH_PUBLIC_GARBAGE,
      );

      console.log("output_log: pathDest =>>>", pathFolderDest);

      return buildResponse(null);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);
