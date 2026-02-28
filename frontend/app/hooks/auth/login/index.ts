import { useAuthContext } from "../../../state";
import { useAxios } from "../../useAxios";
import { useCallback, useState } from "react";
import { LoginPayload, LoginResponse, UseLoginResponse } from "./type";
import { ROUTES } from "../../routes";
import toast from "react-hot-toast";

// export const useLogin = (): UseLoginResponse => {
//   const { setToken } = useAuthContext();
//   const { axios, loading } = useAxios();
//   const [success, setSuccess] = useState<boolean>(false);

//   const login = useCallback(
//     async (payload: LoginPayload) => {
//       try {
//         const response = await axios.post(ROUTES.LOGIN, payload);
//         const { data, success: apiSuccess } = response.data;

//         if (!apiSuccess) {
//           toast.error(response.data.message || "Login failed");
//           setSuccess(false);
//           return false;
//         }

//         if (data?.token) setToken(data.token);
//         setSuccess(true);
//         toast.success(response.data.message || "Login successful");
//         return true;
//       } catch (err) {
//         setSuccess(false);
//         return false;
//       }
//     },
//     [axios, setToken],
//   );

//   return { login, loading, success };
// };

export const useLogin = (): UseLoginResponse => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<LoginResponse | null>(null);
  const { axios } = useAxios();
  const { setToken } = useAuthContext();

  const login = async (
    payload: LoginPayload,
  ): Promise<LoginResponse | null> => {
    try {
      setLoading(true);

      const res = await axios.post(ROUTES.LOGIN, payload);

      setData(res.data);
      setSuccess(true);
      toast.success(res.data.message || "Login successful");

      if (res.data.data.token) {
        setToken(res.data.data.token);
      }

      return res.data;
    } catch (error) {
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, success, data };
};
