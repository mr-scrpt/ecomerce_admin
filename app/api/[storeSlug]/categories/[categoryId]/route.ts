import { ICategory, categoryAction } from "@/fsd/entity/Category";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { ResponseErrorEnum } from "@/fsd/shared/type/responseError.enum";
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
    const errorResponse = buildResponse(null, error, status);
    return NextResponse.json(errorResponse, { status });
  }
};

export const DELETE = async (_: Request, meta: IMetaCategory) => {
  try {
    const { params } = meta;
    const { categoryId } = params;

    const { data, error, status } =
      await categoryAction.removeCategory(categoryId);
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

export const PATCH = async (req: Request, meta: IMetaCategory) => {
  try {
    const { params } = meta;
    const { categoryId } = params;
    const body = await req.json();
    const { storeId, name, billboardId } = body;

    if (!storeId || !name || !billboardId) {
      throw new HttpException(
        ResponseErrorEnum.BAD_DATA,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }

    const { data, error, status } = await categoryAction.updateCategory({
      storeId,
      categoryId,
      name,
      billboardId,
    });

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
