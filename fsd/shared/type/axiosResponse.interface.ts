import { AxiosResponse } from "axios";
import { IApiResponse } from "./apiResponse.interface";
export type AxiosResponseType<T> = AxiosResponse<IApiResponse<T>>;
