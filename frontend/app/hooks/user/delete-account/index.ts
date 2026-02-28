import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ROUTES } from "../../routes";
import { useAuthContext } from "../../../state";
import { useAxios } from "../../useAxios";

export interface DeleteAccountPayload {
  reasons: string[];
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

export const useDeleteUserAccount = (): UseMutationResult<
  DeleteAccountResponse,
  Error,
  DeleteAccountPayload,
  unknown
> => {
  const queryClient = useQueryClient();
  const { token, setToken } = useAuthContext();
  const { axios } = useAxios(); 

  return useMutation({
    mutationFn: async (payload: DeleteAccountPayload) => {
      if (!token)
        throw new Error("No auth token found, kindly login to continue");

      const response = await axios.delete(
        ROUTES.DELETE_USER_ACCOUNT,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { reasons: payload.reasons },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      setToken(null);
      toast.success("Account deleted successfully. You have been logged out.");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to delete account");
    },
  });
};