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

import { PathServerEnum } from "@/fsd/shared/data/pathServer.enum";
import { checkFormDataIsBuffer } from "@/fsd/shared/lib/chechFormDataIsBuffer";
import { checkAndCreatePath } from "@/fsd/shared/lib/checkAndCreatePath";
import { checkAndRemoveFile } from "@/fsd/shared/lib/checkAndRemoveFile";
import { getFormDataValue } from "@/fsd/shared/lib/getFormDataValue";
import { slugGenerator } from "@/fsd/shared/lib/slugGenerator";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

// };

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const entity = getFormDataValue(formData.get("entity"));

    // const pathToFile = getFormDataValue(formData.get("pathToFile"));
    const nameToFile = getFormDataValue(formData.get("nameToFile"));

    const formDataEntryValues = Array.from(formData.values());

    const rootPath = process.cwd();

    let uploadPath: string;

    if (entity && nameToFile) {
      const slug = slugGenerator(nameToFile);
      console.log("output_log: slug =>>>", slug);
      uploadPath = join(rootPath, PathServerEnum.UPLOAD, entity, slug);
    } else {
      uploadPath = join(rootPath, PathServerEnum.GARBAGE);
    }

    await checkAndCreatePath(uploadPath);

    let idx = 1;
    for (const value of formDataEntryValues) {
      if (checkFormDataIsBuffer(value)) {
        console.log("output_log: value =>>>", value);
        // const file = value as unknown as File;
        // const fileExtension = file.name.split(".").pop();
        //
        // const buffer = Buffer.from(await file.arrayBuffer());
        //
        // const slug = slugGenerator(`${nameToFile}_${idx}.${fileExtension}`);
        // const filePath = join(uploadPath, slug);
        // await checkAndRemoveFile(filePath);
        // await writeFile(filePath, buffer);
        idx++;
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.log("output_log:  =>>>", e);
    return NextResponse.json({
      success: false,
      error: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    });
  }
}
