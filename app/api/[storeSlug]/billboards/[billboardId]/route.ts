import { IBillboard, billboardAction } from "@/fsd/entity/Billboard";
import { buildError } from "@/fsd/shared/lib/buildError";
import { HttpException } from "@/fsd/shared/lib/httpException";
import { buildResponse } from "@/fsd/shared/lib/responseBuilder";
import { HTTPStatusEnum } from "@/fsd/shared/type/httpStatus.enum";
import { ResponseDataAction } from "@/fsd/shared/type/response.type";
import { ResponseErrorEnum } from "@/fsd/shared/type/responseError.enum";
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
    const errorResponse = buildResponse(null, error, status);
    return NextResponse.json(errorResponse, { status });
  }
};

// export const DELETE = async (_: Request, meta: IMetaBillboard) => {
//   try {
//     const { params } = meta;
//     const { billboardId } = params;
//
//     const { data, error, status } =
//       await billboardAction.removeBillboard(billboardId);
//     if (error) {
//       throw new HttpException(error, status);
//     }
//     const response = buildResponse(data);
//     return NextResponse.json(response);
//   } catch (e) {
//     const { error, status } = buildError(e);
//     const errorResponse = buildResponse(null, error, status);
//     return NextResponse.json(errorResponse, { status });
//   }
// };
//
// export const PATCH = async (req: Request, meta: IMetaBillboard) => {
//   try {
//     const { params } = meta;
//     const { billboardId } = params;
//     const body = await req.json();
//     const { storeId, name, imgUrl } = body;
//
//     if (!storeId || !name || !imgUrl) {
//       throw new HttpException(
//         ResponseErrorEnum.BAD_DATA,
//         HTTPStatusEnum.BAD_REQUEST,
//       );
//     }
//
//     const { data, error, status } = await billboardAction.updateBillboard({
//       storeId,
//       billboardId,
//       name,
//       imgUrl,
//     });
//
//     if (error) {
//       throw new HttpException(error, status);
//     }
//     const response = buildResponse(data);
//     return NextResponse.json(response);
//   } catch (e) {
//     const { error, status } = buildError(e);
//     const errorResponse = buildResponse(null, error, status);
//     return NextResponse.json(errorResponse, { status });
//   }
// };
