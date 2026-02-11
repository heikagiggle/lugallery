import { AxiosInstance } from 'axios';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
}

export interface UseAxiosResponse {
  axios: AxiosInstance;
  loading: boolean;
}
