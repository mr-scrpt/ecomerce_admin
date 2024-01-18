export interface IApiResponse<T> {
  response: T;
  error: string | null;
  mytest: string;
  status: number;
}
