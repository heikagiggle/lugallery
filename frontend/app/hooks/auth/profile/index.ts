import { useAuthContext } from "../../../state";
import { ROUTES } from "../../routes";
import { useAxios } from "../../useAxios";
import { useQuery } from "@tanstack/react-query";

export const useAllProfile = () => {
  const { token } = useAuthContext();
  const { axios } = useAxios();

  return useQuery({
    queryKey: ['profile'],
    enabled: !!token,
    queryFn: async () => {
      const res = await axios.get(ROUTES.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });

      return res.data.data;
    },
  });
};

