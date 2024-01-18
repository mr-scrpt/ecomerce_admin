export interface IApiResponse<T> {
  response: T;
  error: string | null;
  status: number;
}
