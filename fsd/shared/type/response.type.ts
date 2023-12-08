export interface ResponseDataAction<T> {
  data: T | null;
  error: string | null;
  status: number;
}
