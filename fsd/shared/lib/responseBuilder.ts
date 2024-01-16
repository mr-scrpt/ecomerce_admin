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
  error: string | null = null,
  status?: number,
): ResponseDataAction<T> => {
  return {
    data: error === null ? data : null,
    error,
    status,
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