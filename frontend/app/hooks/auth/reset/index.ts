import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useAxios } from "../../useAxios";
import { ROUTES } from "../../routes";
import { useAuthContext } from "../../../state";
import {
  ForgotPayload,
  ForgotResponse,
  UseForgotResponse,
  CodePayload,
  CodeResponse,
  UseCodeResponse,
  ResetPayload,
  ResetResponse,
  UseResetResponse,
} from "./type";

// Forgot password
export const useForgotPassword = (): UseForgotResponse => {
  const { axios, loading } = useAxios();
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const forgot = useCallback(
    async (payload: ForgotPayload) => {
      setMessage("");
      setSuccess(false);
      try {
        const response = await axios.post<ForgotResponse>(
          `${ROUTES.FORGOT_PASSWORD}`,
          payload,
        );
        toast.success(response.data.message);
        setMessage(response.data.message);
        setSuccess(true);
      } catch {
        setMessage("An error occurred");
        setSuccess(false);
      }
    },
    [axios],
  );

  return { forgot, loading, message, success };
};

// verification
export const useCode = (): UseCodeResponse => {
  const { axios, loading } = useAxios();
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const code = useCallback(
    async (payload: CodePayload) => {
      setMessage("");
      setSuccess(false);
      try {
        const response = await axios.post<CodeResponse>(
          `${ROUTES.VERIFY_OTP}`,
          payload,
        );
        toast.success(response.data.message);
        setMessage(response.data.message);
        setSuccess(true);
      } catch {
        setMessage("An error occurred");
        setSuccess(false);
      }
    },
    [axios],
  );

  return { code, loading, message, success };
};

// resetpassword
export const useResetPassword = (): UseResetResponse => {
  const { axios, loading } = useAxios();
  const { token } = useAuthContext();
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const reset = useCallback(
    async (payload: ResetPayload) => {
      setMessage("");
      setSuccess(false);
      try {
        const response = await axios.post<ResetResponse>(
          `${ROUTES.RESET_PASSWORD}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Password reset successful");
        setMessage(response.data.message);
        setSuccess(true);
      } catch {
        setMessage("An error occurred");
        setSuccess(false);
      }
    },
    [axios, token],
  );

  return { reset, loading, message, success };
};
