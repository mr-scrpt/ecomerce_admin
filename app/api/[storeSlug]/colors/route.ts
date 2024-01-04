import { colorAction } from "@/fsd/entity/Color";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { NextResponse } from "next/server";

interface IMetaColor {
  params: {
    storeSlug: string;
  };
}
export const GET = async (_: Request, meta: IMetaColor) => {
  try {
    const { params } = meta;
    const { storeSlug } = params;
    const { data, error, status } =
      await colorAction.getColorListByStoreSlug(storeSlug);

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
