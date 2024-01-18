import { HTTPStatusEnum } from "../type/httpStatus.enum";
import { ResponseDataAction } from "../type/response.type";

// export const buildResponse = <T>(
//   data: T,
//   error: string | null = null,
//   status?: number,
// ): ResponseDataAction<T> => {
//   if (error) {
//     return {
//       data: null,
//       error,
//       status,
//     };
//   } else {
//     return {
//       data,
//       error,
//       status,
//     };
//   }
// };
export const buildResponse = <T>(
  data: T,
  status?: number,
  error: string | null = null,
): ResponseDataAction<T> => {
  return {
    data,
    status: status ? status : HTTPStatusEnum.OK,
    error,
  };
};

export const buildErrorResponse = (
  status?: number,
  error: string | null = null,
): ResponseDataAction<null> => {
  return {
    data: null,
    status,
    error,
  };
};

// export const buildResponse = <T>(
//   data: T,
//   error: string | null = null,
//   status?: number,
// ): ResponseDataAction<T> => {
//   return {
//     data: error ? (null as T) : data,
//     error,
//     status,
//   };
// };

// export const buildResponse = <T>(
//   data: T | null,
//   error: string | null = null,
//   status?: number,
// ): ResponseDataAction<T> => {
//   return {
//     data: data as NonNullable<T>,
//     error,
//     status,
//   };
// };
// export const buildResponse = <T>(
//   data: T,
//   error: string | null = null,
//   status?: number,
// ): ResponseDataAction<T> => {
//   return {
//     data,
//     error,
//     status,
//   };
// };
