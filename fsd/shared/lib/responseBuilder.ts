import { HTTPStatusEnum } from "../type/httpStatus.enum";
import { ResponseDataAction } from "../type/response.type";

export const buildResponse = <T>(
  data: T,
  error: string | null = null,
  status: number = HTTPStatusEnum.OK,
): ResponseDataAction<T> => {
  return {
    data,
    error,
    status,
  };
};
