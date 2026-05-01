import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

import { ApiResponse } from './types';
import { useAxios } from './useAxios';

export const useFetcher = <T>(
  url?: string | null,
  token?: string | null,
  hideToast?: boolean
) => {
  const { axios } = useAxios();

  const fetcher = (url: string) => {
    const options: AxiosRequestConfig = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    return axios.get<never, ApiResponse<T>>(url, options);
  };

  const { data, isValidating, error, mutate } = useSWR<
    ApiResponse<T>,
    AxiosError<ApiResponse>
  >(url, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
    revalidateIfStale: false,
  });

  useEffect(() => {
    if (hideToast) return;

    if (error) {
      const errorMessages: string[] = (error.response?.data.message ?? '')
        .split(',')
        .map((m: string) => m.trim());
      for (const message of errorMessages) {
        toast.error(message);
      }
    }
  }, [error, hideToast]);

  return {
    data,
    isValidating,
    error,
    mutate,
  };
};