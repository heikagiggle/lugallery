// import Axios, { AxiosError, AxiosResponse } from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// import { useAuthContext } from "../state";
// import { ApiResponse, UseAxiosResponse } from "./types";

// export const useAxios = (): UseAxiosResponse => {
//   const { token } = useAuthContext();
//   const [loading, setLoading] = useState<boolean>(false);

//   const axios = Axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   });

//   axios.interceptors.request.use((config) => {
//     setLoading(true);

//     const isAuthRoute =
//       config.url?.includes("/login") || config.url?.includes("/register");

//     if (!isAuthRoute && token) {
//       config.headers.set("Authorization", `Bearer ${token}`);
//       config.headers.set("Cache-Control-Enabled", "false");
//     }

//     return config;
//   });

//   axios.interceptors.response.use(
//     (response: AxiosResponse) => {
//       setLoading(false);
//       return response;
//     },
//     (error: AxiosError<ApiResponse>) => {
//       setLoading(false);
//       if (!error.response) {
//         toast.error("Connection error");
//         throw error;
//       }

//       const response = error.response;

//       if (response.status >= 500) {
//         toast.error("An unknown server error occurred");
//       } else if (response.status === 404) {
//         toast.error("Resource not found");
//       } else if (response.status === 404 || response.status === 401) {
//         toast.error(response.data.message || "An error occured");
//       } else {
//         toast.error(response.data.message || "An error occured");
//       }

//       throw error;
//     }
//   );

//   return { axios, loading };
// };

import Axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../state";
import { ApiResponse, UseAxiosResponse } from "./types";

export const useAxios = (): UseAxiosResponse => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Create axios instance only once
  const axiosInstance = useMemo(() => {
    return Axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });
  }, []);

  // ✅ Attach interceptors safely
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);

        const isAuthRoute =
          config.url?.includes("/login") ||
          config.url?.includes("/register");

        if (!isAuthRoute && token) {
          config.headers.set("Authorization", `Bearer ${token}`);
          config.headers.set("Cache-Control-Enabled", "false");
        }

        return config;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        setLoading(false);
        return response;
      },
      (error: AxiosError<ApiResponse>) => {
        setLoading(false);

        if (!error.response) {
          toast.error("Connection error");
          return Promise.reject(error);
        }

        const response = error.response;

        if (response.status >= 500) {
          toast.error("An unknown server error occurred");
        } else {
          toast.error(response.data?.message || "An error occurred");
        }

        return Promise.reject(error);
      }
    );

    // ✅ Cleanup old interceptors (CRITICAL)
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, token]);

  return { axios: axiosInstance, loading };
};