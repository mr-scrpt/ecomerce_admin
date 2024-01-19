// import { PATH_PUBLIC } from "@/fsd/shared/data/pathServer.enum";
// import { getFormDataValue } from "@/fsd/shared/lib/getFormDataValue";
// import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
// import { NextResponse } from "next/server";
// import { unlink } from "node:fs/promises";
// import { join } from "node:path";
//
// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const item = getFormDataValue(formData.get("item"));
//     if (!item) return;
//     const rootPath = process.cwd();
//     const deletePath = join(rootPath, PATH_PUBLIC, item);
//     console.log("output_log:  delete fool path=>>>", deletePath);
//
//     await unlink(deletePath);
//
//     return NextResponse.json({ response: "ok", success: true });
//   } catch (e) {
//     console.log("output_log:  =>>>", e);
//     return NextResponse.json({
//       success: false,
//       error: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
//     });
//   }
// }
//
// export async function DELETE(req: Request) {
//   try {
//     const formData = await req.formData();
//     const item = getFormDataValue(formData.get("item"));
//     console.log("output_log: item to remove  =>>>", item);
//
//     return NextResponse.json({ response: loadedListPath, success: true });
//   } catch (e) {
//     console.log("output_log:  =>>>", e);
//     return NextResponse.json({
//       success: false,
//       error: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
//     });
//   }
// }
