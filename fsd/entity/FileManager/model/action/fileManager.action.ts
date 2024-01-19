"use server";

import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { checkAuthUser } from "@/fsd/shared/model";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import {
  access,
  mkdir,
  readdir,
  rename,
  rm,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { join, relative } from "node:path";
import { cache } from "react";
import {
  IFileMovePayload,
  IFileRemoveListPayload,
  IFileUploadPayload,
} from "../../type/action.type";
import {
  CATALOG_PUBLIC,
  PATH_PUBLIC_FULL,
  PATH_PUBLIC_GARBAGE,
  PATH_PUBLIC_TMP,
} from "../../type/fileManagerPath.const";

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
      const { fileList, fileName, storeSlug, entity } = data;

      await checkAuthUser(checkAuth);

      const folderNameComplited = fileName ? slugGenerator(fileName) : null;
      const folderEntityComplited = entity ? slugGenerator(entity) : null;
      const folderStoreComplited = storeSlug;

      const pathFolderDest = join(
        folderEntityComplited && folderNameComplited && folderStoreComplited
          ? join(
              PATH_PUBLIC_TMP,
              folderStoreComplited,
              folderEntityComplited,
              folderNameComplited,
            )
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

export const moveFolderPrepare = cache(
  async (
    data: IFileMovePayload,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<string | null>> => {
    try {
      const { folderName, entity, storeSlug } = data;
      await checkAuthUser(checkAuth);

      const folderNameComplited = folderName ? slugGenerator(folderName) : null;
      const folderEntityComplited = entity ? slugGenerator(entity) : null;
      const folderStoreComplited = storeSlug;

      const pathFromFolder = join(
        folderEntityComplited && folderNameComplited && folderStoreComplited
          ? join(
              PATH_PUBLIC_TMP,
              folderStoreComplited,
              folderEntityComplited,
              folderNameComplited,
            )
          : PATH_PUBLIC_GARBAGE,
      );

      const pathToFolder = join(
        folderEntityComplited && folderNameComplited && folderStoreComplited
          ? join(
              PATH_PUBLIC_FULL,
              folderStoreComplited,
              folderEntityComplited,
              folderNameComplited,
            )
          : PATH_PUBLIC_GARBAGE,
      );
      console.log("output_log: pathFrom =>>>", pathFromFolder);
      console.log("output_log: pathTo =>>>", pathToFolder);

      // const pathToMove = join(PATH_PUBLIC_FULL, );
      await moveFolder(pathToFolder, pathFromFolder);
      return buildResponse(pathToFolder);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const moveFolder = cache(
  async (
    pathToFolder: string,
    pathFromFolder: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<null>> => {
    try {
      await checkAuthUser(checkAuth);
      await checkAndRemoveFolder(pathToFolder);
      await checkAndCreatePath(pathToFolder);
      await checkAndRename(pathFromFolder, pathToFolder);

      return buildResponse(null);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const getFileListPublicRelative = cache(
  async (
    pathToFolder: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<string[] | null>> => {
    try {
      await checkAuthUser(checkAuth);
      const { data: fileList, error, status } = await getFileList(pathToFolder);
      if (error) {
        throw new HttpException(error, status);
      }
      const fileListRelative = fileList!.map((item) =>
        makePathProjectRelative(item, CATALOG_PUBLIC),
      );

      return buildResponse(fileListRelative);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

const getFileList = cache(
  async (
    pathToFolder: string,
    checkAuth: boolean = true,
  ): Promise<ResponseDataAction<string[] | null>> => {
    try {
      await checkAuthUser(checkAuth);
      // Чтение файлов в директории
      const files = await readdir(pathToFolder);
      const filePathList: string[] = [];

      // Фильтрация файлов (если нужно)
      for await (const file of files) {
        const filePath = join(pathToFolder, file);
        const fileStat = await stat(filePath);

        if (fileStat.isFile()) {
          filePathList.push(filePath);
        }
      }
      console.log("output_log: filePathList =>>>", filePathList);

      // Получение полных путей ко всем файлам
      // const filePaths = filteredFiles.map((file) =>
      //   path.join(directoryPath, file),
      // );

      return buildResponse(filePathList);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildErrorResponse(status, error);
    }
  },
);

export const checkFormDataIsBuffer = (value: FormDataEntryValue): Boolean =>
  !!(typeof value === "object" && "arrayBuffer" in value);

const checkAndCreatePath = async (pathToCreate: string): Promise<void> => {
  try {
    await access(pathToCreate);
  } catch (error) {
    await mkdir(pathToCreate, { recursive: true });
  }
};

const checkAndCrearPath = async (pathToCreate: string): Promise<void> => {
  try {
    await access(pathToCreate);
    await unlink(pathToCreate);
    await mkdir(pathToCreate, { recursive: true });
  } catch (error) {
    await mkdir(pathToCreate, { recursive: true });
  }
};

const checkAndRemoveFolder = async (pathToRemove: string): Promise<void> => {
  try {
    await access(pathToRemove);
    await rm(pathToRemove, { recursive: true });
    console.log("output_log:  =>>> folder has been removed");
  } catch (error) {
    console.log("output_log:  =>>> folder not exist");
  }
};

const checkAndRemoveFile = async (pathToCreate: string): Promise<void> => {
  try {
    await access(pathToCreate);
    await unlink(pathToCreate);
    console.log("output_log:  =>>> file has been removed");
  } catch (error) {
    console.log("output_log:  =>>> file not exist");
  }
};

const checkAndRename = async (
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

const makePathProjectRelative = (
  absolutePath: string,
  substringToRemove: string,
) => {
  const currentFolder = process.cwd();

  const relativePath = relative(currentFolder, absolutePath);

  // Удаление подстроки из относительного пути
  const substringIndex = relativePath.indexOf(substringToRemove);
  const finalPath = `${substringIndex !== -1 ? relativePath.slice(substringIndex + substringToRemove.length) : relativePath}`;

  return finalPath;
};

export const getFormDataValue = (
  str: FormDataEntryValue | null | undefined,
): string | null => {
  return typeof str === "string" && str.trim() !== "" ? str : null;
};

export const getFileName = (path: string): string =>
  path.split("/").pop() || "";
