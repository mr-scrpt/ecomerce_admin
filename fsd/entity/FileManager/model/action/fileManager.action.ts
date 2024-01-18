"use server";

import { buildError } from "@/fsd/shared/lib/buildError";
import { checkAndCrearPath } from "@/fsd/shared/lib/checkAndClearFolder";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { checkAuthUser } from "@/fsd/shared/model";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { join, relative } from "node:path";
import { cache } from "react";
import { IUploadFileListPayload } from "../../type/action.type";
import {
  CATALOG_PUBLIC,
  PATH_PUBLIC_GARBAGE,
  PATH_PUBLIC_TMP,
} from "../../type/fileManagerPath.const";
import { writeFile } from "node:fs/promises";
import { makePathProjectRelative } from "@/fsd/shared/lib/makePathProjectRelative";

export const uploadeFileList = cache(
  async (
    data: IUploadFileListPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<string[] | null>> => {
    try {
      const { fileList, name, entity } = data;

      await checkAuthUser(checkAuth);

      const folderName = name ? slugGenerator(name) : null;
      const folderEntity = entity ? slugGenerator(entity) : null;

      const pathFolderDest = join(
        folderEntity && folderName
          ? join(PATH_PUBLIC_TMP, folderEntity, folderName)
          : PATH_PUBLIC_GARBAGE,
      );

      await checkAndCrearPath(pathFolderDest);
      const pathListResponse: string[] = [];
      for await (const [idx, file] of fileList.entries()) {
        const fileExtension = file.name.split(".").pop();
        const buffer = Buffer.from(await file.arrayBuffer());

        const fileNameDest = slugGenerator(`${name}_${idx}.${fileExtension}`);
        const pathComplitedDest = join(pathFolderDest, fileNameDest);
        console.log("output_log:  =>>>", pathComplitedDest);

        await writeFile(pathComplitedDest, buffer);

        const pathComplitedRelative = makePathProjectRelative(
          pathComplitedDest,
          CATALOG_PUBLIC,
        );
        pathListResponse.push(pathComplitedRelative);
      }
      console.log("output_log: response path list =>>>", pathListResponse);

      return buildResponse(pathListResponse);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);
