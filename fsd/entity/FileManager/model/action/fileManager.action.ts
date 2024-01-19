"use server";

import { buildError } from "@/fsd/shared/lib/buildError";
import { checkAndCrearPath } from "@/fsd/shared/lib/checkAndClearFolder";
import { makePathProjectRelative } from "@/fsd/shared/lib/makePathProjectRelative";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { checkAuthUser } from "@/fsd/shared/model";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { access, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import {
  IFileRemoveListPayload,
  IFileRemovePayload,
  IFileUploadPayload,
} from "../../type/action.type";
import {
  CATALOG_PUBLIC,
  PATH_PUBLIC_FULL,
  PATH_PUBLIC_GARBAGE,
  PATH_PUBLIC_TMP,
} from "../../type/fileManagerPath.const";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { checkAndRename } from "@/fsd/shared/lib/checkAndRename";
import { checkAndRemoveFile } from "@/fsd/shared/lib/checkAndRemoveFile";

export const uploadeFile = cache(
  async (
    data: IFileUploadPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<string | null>> => {
    try {
      const { file, name, pathToFolder } = data;

      await checkAuthUser(checkAuth);

      const pathComplitedDest = join(pathToFolder, name);

      const buffer = Buffer.from(await file.arrayBuffer());

      await writeFile(pathComplitedDest, buffer);

      const pathComplitedRelative = makePathProjectRelative(
        pathComplitedDest,
        CATALOG_PUBLIC,
      );
      return buildResponse(pathComplitedRelative);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const uploadeFileList = cache(
  async (
    data: IFileRemoveListPayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<string[] | null>> => {
    try {
      const { fileList, fileName, storeName, entity } = data;

      await checkAuthUser(checkAuth);

      const folderName = fileName ? slugGenerator(fileName) : null;
      const folderEntity = entity ? slugGenerator(entity) : null;
      const folderStore = storeName ? slugGenerator(storeName) : null;

      const pathFolderDest = join(
        folderEntity && folderName && folderStore
          ? join(PATH_PUBLIC_TMP, folderStore, folderEntity, folderName)
          : PATH_PUBLIC_GARBAGE,
      );

      await checkAndCrearPath(pathFolderDest);
      const pathListResponse: string[] = [];
      for await (const [idx, file] of fileList.entries()) {
        const fileExtension = file.name.split(".").pop();
        const fileNameDest = slugGenerator(
          `${fileName}_${idx}.${fileExtension}`,
        );

        const { data, error, status } = await uploadeFile(
          { pathToFolder: pathFolderDest, file, name: fileNameDest },
          false,
        );
        if (error) {
          throw new HttpException(error, status);
        }

        if (data) {
          pathListResponse.push(data);
        }
      }

      return buildResponse(pathListResponse);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const removeFilePrepare = cache(
  async (
    pathToFile: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<null>> => {
    try {
      await checkAuthUser(checkAuth);

      const pathToRemove = join(PATH_PUBLIC_FULL, pathToFile);
      await removeFile(pathToRemove, true);
      return buildResponse(null);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const removeFile = cache(
  async (
    pathToRemove: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<null>> => {
    try {
      await checkAuthUser(checkAuth);
      await checkAndRemoveFile(pathToRemove);

      return buildResponse(null);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);
