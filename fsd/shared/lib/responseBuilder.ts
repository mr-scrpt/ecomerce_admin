import { ResponseDataAction } from "../type/response.type";

export const buildResponse = <T>(
  data: T,
  error: string | null = null,
  status?: number,
): ResponseDataAction<T> => {
  return {
    data,
    error,
    status,
  };
};
