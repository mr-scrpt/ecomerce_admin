// export const POST = async (req: Request) => {
//   try {
//     console.log("output_log: on POST =>>>");
//     const formData = await req.formData();
//     const formDataEntryValues = Array.from(formData.values());
//     console.log("output_log:  =>>>", formDataEntryValues);
//     for (const formDataEntryValue of formDataEntryValues) {
//       console.log("output_log:  =>>>", formDataEntryValue);
//       if (
//         typeof formDataEntryValue === "object" &&
//         "arrayBuffer" in formDataEntryValue
//       ) {
//         console.log("output_log:  =>>> in file");
//         const file = formDataEntryValue as unknown as Blob;
//         console.log("output_log:  =>>>", file);
//         const buffer = Buffer.from(await file.arrayBuffer());
//         // fs.writeFileSync(`public/${file.name}`, buffer);
//       }
//     }
//     // const fileList = formData.get("fileList");
//     // console.log("output_log: FILE LIST__ =>>>", fileList);
//   } catch (e) {
//     console.log("output_log:  =>>>", e);
//   }

import { UploadPathEnum } from "@/fsd/entity/FileUploader/type/uploadPath.enum";
import { PathServerEnum } from "@/fsd/shared/data/pathServer.enum";
import { NextResponse } from "next/server";
import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// };

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    // Определяем корневую папку проекта
    const rootPath = process.cwd();

    // Определяем путь для сохранения файлов
    const uploadPath = join(
      rootPath,
      PathServerEnum.UPLOAD,
      UploadPathEnum.PRODUCTS,
    );

    // Проверяем существование каталога
    try {
      await access(uploadPath);
    } catch (error) {
      // Каталог не существует, создаем его
      await mkdir(uploadPath, { recursive: true });
    }

    for (const formDataEntryValue of formDataEntryValues) {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        const file = formDataEntryValue as unknown as File;
        const buffer = Buffer.from(await file.arrayBuffer());

        // Используем writeFile только для создания файлов в директории
        const filePath = join(uploadPath, file.name);
        await writeFile(filePath, buffer);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("output_log:  =>>>", e);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
