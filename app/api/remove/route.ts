import { UploadPathEnum } from "@/fsd/entity/FileUploader/type/uploadPath.enum";
import { PATH_PUBLIC, PathServerEnum } from "@/fsd/shared/data/pathServer.enum";
import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { checkFormDataIsBuffer } from "@/fsd/shared/lib/chechFormDataIsBuffer";
import { checkAndCreatePath } from "@/fsd/shared/lib/checkAndCreatePath";
import { checkAndRemoveFile } from "@/fsd/shared/lib/checkAndRemoveFile";
import { getFormDataValue } from "@/fsd/shared/lib/getFormDataValue";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { NextResponse } from "next/server";
import { unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const item = getFormDataValue(formData.get("item"));
    if (!item) return;

    // const pathToFile = getFormDataValue(formData.get("pathToFile"));
    // const nameToFile = getFormDataValue(formData.get("nameToFile"));
    //
    // const formDataEntryValues = Array.from(formData.values());
    //
    const rootPath = process.cwd();
    const deletePath = join(rootPath, PATH_PUBLIC, item);
    console.log("output_log:  delete fool path=>>>", deletePath);

    await unlink(deletePath);

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
