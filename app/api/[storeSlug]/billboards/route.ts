import { billboardAction } from "@/fsd/entity/Billboard";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseErrorEnum } from "@/fsd/shared/type/responseError.enum";
import { NextResponse } from "next/server";

interface IMetaBillboard {
  params: {
    storeSlug: string;
  };
}
export const GET = async (_: Request, meta: IMetaBillboard) => {
  try {
    const { params } = meta;
    const { storeSlug } = params;
    const { data, error, status } =
      await billboardAction.getBillboardListByStoreSlug(storeSlug);

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

export const POST = async (req: Request, meta: IMetaBillboard) => {
  try {
    const body = await req.json();
    const { storeId, name, imgUrl } = body;

    if (!storeId || !name || !imgUrl) {
      throw new HttpException(
        ResponseErrorEnum.BAD_DATA,
        HTTPStatusEnum.BAD_REQUEST,
      );
    }

    const { data, error, status } = await billboardAction.createBillboard({
      storeId,
      name,
      imgUrl,
    });

    if (error) {
      console.log(" =>>> error", error);
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
