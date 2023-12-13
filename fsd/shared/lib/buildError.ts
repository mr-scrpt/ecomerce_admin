import { HTTPErrorMessage } from "../type/httpErrorMessage";
import { HTTPStatusEnum } from "../type/httpStatus.enum";
import { HttpException } from "./httpException";

export const buildError = (e: unknown) => {
  if (e instanceof HttpException) {
    return { error: e.message, status: e.status };
  } else {
    return {
      error: HTTPErrorMessage.SERVER_ERROR,
      status: HTTPStatusEnum.INTERNAL_SERVER_ERROR,
    };
  }
};
