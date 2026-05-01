import { useAxios } from "../../useAxios";
import { useAuthContext } from "../../../state";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { ROUTES } from "../../routes";
import { AxiosError } from "axios";

export const useAdminSupportChat = () => {
  const { axios } = useAxios();
  const { token } = useAuthContext();

  const getAllTickets = useCallback(async () => {
    try {
      const res = await axios.get(ROUTES.ADMIN_GET_TICKETS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch {
      toast.error("Failed to fetch tickets");
      return [];
    }
  }, [axios, token]);

  const getTicketById = useCallback(
    async (ticketId: string) => {
      try {
        const res = await axios.get(ROUTES.ADMIN_GET_TICKET_BY_ID(ticketId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
      } catch {
        toast.error("Failed to fetch ticket");
        return null;
      }
    },
    [axios, token],
  );

  //send msg
  const sendMessage = useCallback(
    async (ticketId: string, message: string) => {
      try {
        await axios.post(
          ROUTES.ADMIN_SEND_MESSAGE,
          { ticketId, message },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch {
        toast.error("Failed to send reply");
      }
    },
    [axios, token],
  );

  // close ticket
const closeTicket = useCallback(
  async (ticketId: string) => {
    try {
      await axios.patch(
        ROUTES.ADMIN_CLOSE_TICKET(ticketId),
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Ticket closed");
      return true;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Failed to close ticket"
      );

      return false;
    }
  },
  [axios, token],
);
  return { getAllTickets, getTicketById, sendMessage, closeTicket };
};
