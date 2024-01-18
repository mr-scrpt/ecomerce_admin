export interface IApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}
