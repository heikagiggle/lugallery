import { useCallback, useState } from "react";
import { useAxios } from "../../useAxios";
import { RegisterPayload, RegisterResponse, UseRegisterResponse } from "./type";
import { ROUTES } from "../../routes";
import toast from "react-hot-toast";

export const useRegister = ():UseRegisterResponse => {
  const { axios, loading } = useAxios();
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const signUp = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const response = await axios.post<RegisterResponse>(
          ROUTES.REGISTER,
          payload
        );

        const { success: apiSuccess, message, data } = response.data;

        if (apiSuccess && data) {
          setSuccess(true);
          setMessage(message);
          toast.success(message || "Registration Successful");
        } else {
          setSuccess(false);
          setMessage(message);
          toast.error(message || "Registration failed. Please try again.");
        }
      } catch (error) {
        setSuccess(false);
        console.error("Sign-Up Error:", error);
      }
    },
    [axios]
  );

  return {
    signUp,
    loading,
    success,
    message,
  };
};
