import { FormDataUploadEnum } from "@/fsd/entity/FileManager";
import { uploadeFileList } from "@/fsd/entity/FileManager/model/action/fileManager.action";
import { buildError } from "@/fsd/shared/lib/buildError";
import { checkFormDataIsBuffer } from "@/fsd/shared/lib/chechFormDataIsBuffer";
import { getFormDataValue } from "@/fsd/shared/lib/getFormDataValue";
import { HttpException } from "@/fsd/shared/lib/httpException";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
): Promise<NextResponse<ResponseDataAction<string[] | null>>> {
  try {
    const formData = await req.formData();

    const entity = getFormDataValue(formData.get(FormDataUploadEnum.ENTITY));
    const fileName = getFormDataValue(formData.get(FormDataUploadEnum.NAME));
    const storeName = getFormDataValue(formData.get(FormDataUploadEnum.STORE));

    const formDataEntryValues = Array.from(formData.values());

    const fileList: File[] = [];
    for await (const value of formDataEntryValues) {
      if (checkFormDataIsBuffer(value)) {
        const file = value as unknown as File;
        fileList.push(file);
      }
    }
    const { data, error, status } = await uploadeFileList(
      { fileList, entity, fileName, storeName },
      true,
    );

    if (error) {
      throw new HttpException(error, status);
    }
    const response = buildResponse(data);

    return NextResponse.json(response);
  } catch (e) {
    const { error, status } = buildError(e);
    const errorResponse = buildErrorResponse(status, error);
    return NextResponse.json(errorResponse);
  }
}
