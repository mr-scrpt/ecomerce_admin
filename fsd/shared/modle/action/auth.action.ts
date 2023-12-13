"use server";
import { currentUser } from "@clerk/nextjs";
import { cache } from "react";
import { buildError } from "../../lib/buildError";
import { HttpException } from "../../lib/httpException";
import { buildResponse } from "../../lib/responseBuilder";
import { IUserClerk } from "../../type/clerkUser.type";
import { HTTPStatusEnum } from "../../type/httpStatus.enum";
import { ResponseDataAction } from "../../type/response.type";
import { AuthResponseErrorEnum } from "../../type/responseError.enum";

export const getAuthUser = cache(
  async (): Promise<ResponseDataAction<IUserClerk | null>> => {
    try {
      const user = await currentUser();

      if (!user) {
        throw new HttpException(
          AuthResponseErrorEnum.USER_NOT_FOUND,
          HTTPStatusEnum.NOT_FOUND,
        );
      }

      const data = {
        id: user.id,
        imageUrl: user.imageUrl,
        birthday: user.birthday,
        createdAt: user.createdAt,
        emailAddresses: user.emailAddresses.map((item) => item.emailAddress),
      };

      return buildResponse(data);
    } catch (e) {
      const { error, status } = buildError(e);
      return buildResponse(null, error, status);
    }
  },
);
