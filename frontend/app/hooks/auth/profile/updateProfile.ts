import { useAxios } from "../../useAxios";
import { useCallback, useState } from "react";
import {
  UpdateProfilePayload,
  UpdateProfileResponse,
  UseUpdateProfileResponse,
} from "./type";
import { ROUTES } from "../../routes";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../state";
import { AxiosError } from "axios";

export const useUpdateProfile = (): UseUpdateProfileResponse => {
  const { token } = useAuthContext();
  const { axios, loading } = useAxios();
  const [data, setData] =
    useState<UpdateProfileResponse | null>(null);

  const updateProfile = useCallback(
    async (payload: UpdateProfilePayload) => {
      if (!token) {
        toast.error(
          "You must be logged in to update your profile."
        );
        return;
      }

      try {
        const response = await axios.patch(
          ROUTES.UPDATE_PROFILE,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data: profile, success, message } =
          response.data;

        if (!success) {
          toast.error(message || "Profile update failed");
          return;
        }

        setData(profile);
        toast.success(
          message || "Profile updated successfully!"
        );
      } catch (error: unknown) {
        const err =
          error as AxiosError<{ message?: string }>;

        const errorMsg =
          err.response?.data?.message ||
          "Profile update failed. Please try again.";

        toast.error(errorMsg);
        console.error("Profile update error:", err);
      }
    },
    [axios, token],
  );

  return { updateProfile, loading, data };
};