import { ISize, sizeAction } from "@/fsd/entity/Size";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { NextResponse } from "next/server";

interface IMetaSize {
  params: {
    storeSlug: string;
  };
}
export const GET = async (
  _: Request,
  meta: IMetaSize,
): Promise<NextResponse<ResponseDataAction<ISize[] | null>>> => {
  try {
    const { params } = meta;
    const { storeSlug } = params;
    const { data, error, status } =
      await sizeAction.getSizeListByStoreSlug(storeSlug);

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
};
