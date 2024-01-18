import { IBillboard, billboardAction } from "@/fsd/entity/Billboard";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import {
  buildErrorResponse,
  buildResponse,
} from "@/fsd/shared/lib/responseBuilder";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { NextResponse } from "next/server";

interface IMetaBillboard {
  params: {
    storeSlug: string;
    billboardId: string;
  };
}
export const GET = async (
  _: Request,
  meta: IMetaBillboard,
): Promise<NextResponse<ResponseDataAction<IBillboard | null>>> => {
  try {
    const { params } = meta;
    const { billboardId } = params;
    const { data, error, status } =
      await billboardAction.getBillboard(billboardId);

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
