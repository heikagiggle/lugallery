import { ROUTES } from "../../routes";
import { PasswordPayload, PasswordResponse, UsePasswordResponse } from "./type";
import { useAxios } from "../../useAxios";
import { useAuthContext } from "../../../state";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useChangePasword = (): UsePasswordResponse => {
  const { axios, loading } = useAxios();
  const { token } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<PasswordResponse | null>(null);

  const handlePassword = useCallback(
    async (payload: PasswordPayload) => {
      if (!token) {
        toast.error("You must be logged in to update your profile.");
        return;
      }
      try {
        const res = await axios.put<PasswordResponse>(
          ROUTES.CHANGE_PASSWORD,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const responseData = res.data;

        if (!responseData.success) {
          toast.error("Error in sending details: " + responseData.message);
          throw new Error(responseData.message || "Passsword change failed.");
        } else {
          toast.success("Password changed successfully");
          setData(responseData);
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error in chaging password:", error);
        toast.error("Error in changing password");
        setSuccess(false);
      }
    },
    [axios, token],
  );

  return { handlePassword, loading, success, data };
};
