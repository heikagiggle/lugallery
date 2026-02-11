import { useAuthContext } from "../../../state";
import { useAxios } from "../../useAxios";
import { useCallback, useState } from "react";
import { LoginPayload, LoginResponse, UseLoginResponse } from "./type";
import { ROUTES } from "../../routes";
import toast from "react-hot-toast";

export const useLogin = (): UseLoginResponse => {
  const { setToken } = useAuthContext();
  const { axios, loading } = useAxios();
  const [resData, setResData] = useState<LoginResponse | null>(null);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const response = await axios.post(ROUTES.LOGIN, payload);

        const { data, success, message } = response.data;

        if (!success) {
          if (message) {
            toast.error(message);
          }
        } else if (data) {
          if (data.token) {
            setToken(data.token);
          }

          setResData(response.data);
          toast.success(message || "Login successful!");
        }
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMsg);
        console.error("Login error:", error);
      }
    },
    [axios, setToken]
  );

  return { login, loading, data: resData };
};
