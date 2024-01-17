import { PATH_PUBLIC, PathServerEnum } from "@/fsd/shared/data/pathServer.enum";
import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { checkAndCreatePath } from "@/fsd/shared/lib/checkAndCreatePath";
import { checkAndRemoveDir } from "@/fsd/shared/lib/checkAndRemoveDir";
import { checkAndRemoveFile } from "@/fsd/shared/lib/checkAndRemoveFile";
import { getFormDataValue } from "@/fsd/shared/lib/getFormDataValue";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { NextResponse } from "next/server";
import { unlink, access, rename, rmdir } from "node:fs/promises";
import { join } from "node:path";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const { folder, entity } = await req.json();
    if (folder && entity) {
      const rootPath = process.cwd();
      // const deletePath = join(rootPath, PATH_PUBLIC, item);
      const folderSlug = slugify(folder);
      const folderFrom = join(
        rootPath,
        PathServerEnum.UPLOAD,
        PathUploadEnum.TMP,
        folderSlug,
      );
      access(folderFrom);
      const folderDest = join(
        rootPath,
        PathServerEnum.UPLOAD,
        entity,
        folderSlug,
      );

      await checkAndRemoveDir(folderDest);
      await checkAndCreatePath(folderDest);
      console.log("output_log: oldPath =>>>", folderFrom);
      console.log("output_log: newPath =>>>", folderDest);

      await rename(folderFrom, folderDest);
    }
    // const formData = await req.formData();
    // const folder = getFormDataValue(formData.get("folder"));
    // if (!folder) return;
    // console.log("output_log:  =>>>", folder);
    // await access(folder);
    // await rename(folder,)

    // const pathToFile = getFormDataValue(formData.get("pathToFile"));
    // const nameToFile = getFormDataValue(formData.get("nameToFile"));
    //
    // const formDataEntryValues = Array.from(formData.values());
    //

    //
    // let uploadPath: string;
    // let serverPath: string;
    //
    // if (entity && nameToFile) {
    //   const slug = slugGenerator(nameToFile);
    //   uploadPath = join(rootPath, PathServerEnum.UPLOAD, entity, slug);
    //   serverPath = join("/upload/", entity, slug);
    // } else {
    //   uploadPath = join(rootPath, PathServerEnum.GARBAGE);
    //   serverPath = join("/upload/", PathServerEnum.GARBAGE);
    // }
    //
    // await checkAndCreatePath(uploadPath);
    //
    // let idx = 1;
    // const loadedListPath = [];
    // for await (const value of formDataEntryValues) {
    //   if (checkFormDataIsBuffer(value)) {
    //     const file = value as unknown as File;
    //     const fileExtension = file.name.split(".").pop();
    //
    //     const buffer = Buffer.from(await file.arrayBuffer());
    //
    //     const slug = slugGenerator(`${nameToFile}_${idx}.${fileExtension}`);
    //     const filePath = join(uploadPath, slug);
    //     const serverFilePath = join(serverPath, slug);
    //     loadedListPath.push(serverFilePath);
    //     await checkAndRemoveFile(filePath);
    //     await writeFile(filePath, buffer);
    //     idx++;
    //   }
    // }
    // console.log("output_log:  =>>>", loadedListPath);

    return NextResponse.json({ response: "ok", success: true });
  } catch (e) {
    console.log("output_log:  =>>>", e);
    return NextResponse.json({
      success: false,
      error: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const formData = await req.formData();
    const item = getFormDataValue(formData.get("item"));
    console.log("output_log: item to remove  =>>>", item);

    // const pathToFile = getFormDataValue(formData.get("pathToFile"));
    // const nameToFile = getFormDataValue(formData.get("nameToFile"));
    //
    // const formDataEntryValues = Array.from(formData.values());
    //
    // const rootPath = process.cwd();
    //
    // let uploadPath: string;
    // let serverPath: string;
    //
    // if (entity && nameToFile) {
    //   const slug = slugGenerator(nameToFile);
    //   uploadPath = join(rootPath, PathServerEnum.UPLOAD, entity, slug);
    //   serverPath = join("/upload/", entity, slug);
    // } else {
    //   uploadPath = join(rootPath, PathServerEnum.GARBAGE);
    //   serverPath = join("/upload/", PathServerEnum.GARBAGE);
    // }
    //
    // await checkAndCreatePath(uploadPath);
    //
    // let idx = 1;
    // const loadedListPath = [];
    // for await (const value of formDataEntryValues) {
    //   if (checkFormDataIsBuffer(value)) {
    //     const file = value as unknown as File;
    //     const fileExtension = file.name.split(".").pop();
    //
    //     const buffer = Buffer.from(await file.arrayBuffer());
    //
    //     const slug = slugGenerator(`${nameToFile}_${idx}.${fileExtension}`);
    //     const filePath = join(uploadPath, slug);
    //     const serverFilePath = join(serverPath, slug);
    //     loadedListPath.push(serverFilePath);
    //     await checkAndRemoveFile(filePath);
    //     await writeFile(filePath, buffer);
    //     idx++;
    //   }
    // }
    // console.log("output_log:  =>>>", loadedListPath);

    return NextResponse.json({ response: loadedListPath, success: true });
  } catch (e) {
    console.log("output_log:  =>>>", e);
    return NextResponse.json({
      success: false,
      error: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    });
  }
}
