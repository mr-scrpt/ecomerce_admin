export const buildResponse = <T>(
  data: T,
  error: string | null,
  status: number,
) => {
  return {
    data,
    error,
    status,
  };
};
