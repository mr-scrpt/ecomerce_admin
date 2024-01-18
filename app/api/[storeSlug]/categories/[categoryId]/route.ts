import { ICategory, categoryAction } from "@/fsd/entity/Category";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { NextResponse } from "next/server";

interface IMetaCategory {
  params: {
    storeSlug: string;
    categoryId: string;
  };
}
export const GET = async (
  _: Request,
  meta: IMetaCategory,
): Promise<NextResponse<ResponseDataAction<ICategory | null>>> => {
  try {
    const { params } = meta;
    const { categoryId } = params;
    const { data, error, status } =
      await categoryAction.getCategory(categoryId);

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
