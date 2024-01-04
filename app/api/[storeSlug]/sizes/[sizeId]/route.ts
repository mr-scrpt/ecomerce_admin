import { ISize, sizeAction } from "@/fsd/entity/Size";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { ResponseErrorEnum } from "@/fsd/shared/type/responseError.enum";
import { NextResponse } from "next/server";

interface IMetaSize {
  params: {
    storeSlug: string;
    sizeId: string;
  };
}
export const GET = async (
  _: Request,
  meta: IMetaSize,
): Promise<NextResponse<ResponseDataAction<ISize | null>>> => {
  try {
    const { params } = meta;
    const { sizeId } = params;
    const { data, error, status } = await sizeAction.getSize(sizeId);

    if (error) {
      throw new HttpException(error, status);
    }
    const response = buildResponse(data);
    return NextResponse.json(response);
  } catch (e) {
    const { error, status } = buildError(e);
    const errorResponse = buildResponse(null, error, status);
    return NextResponse.json(errorResponse, { status });
  }
};
