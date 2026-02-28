import { ROUTES } from "../../routes";
import { useAxios } from "../../useAxios";
import { useAuthContext } from "../../../state";
import { useCallback } from "react";
import toast from "react-hot-toast";

export interface SupportMessage {
  id: string;
  message: string;
  sender: "USER" | "ADMIN";
  createdAt: string;
}

export interface SupportTicketResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    messages: SupportMessage[];
  };
}

export const useSupportChat = () => {
  const { axios, loading } = useAxios();
  const { token } = useAuthContext();

  const createTicket = useCallback(
    async (message: string): Promise<string | null> => {
      if (!token) {
        toast.error("You must be logged in.");
        return null;
      }

      try {
        const res = await axios.post<SupportTicketResponse>(
          ROUTES.CREATE_SUPPORT_TICKET,
          { message },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res.data.data.id;
      } catch (error) {
        console.error("Create ticket error:", error);
        toast.error("Failed to start chat.");
        return null;
      }
    },
    [axios, token]
  );

  const sendMessage = useCallback(
    async (ticketId: string, message: string): Promise<void> => {
      if (!token) return;

      try {
        await axios.post(
          ROUTES.SEND_SUPPORT_MESSAGE,
          { ticketId, message },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Send message error:", error);
        toast.error("Failed to send message.");
      }
    },
    [axios, token]
  );

  const getTicketById = useCallback(
    async (ticketId: string): Promise<SupportMessage[] | null> => {
      if (!token) return null;

      try {
        const res = await axios.get<SupportTicketResponse>(
          ROUTES.GET_TICKET_BY_ID(ticketId),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        return res.data.data.messages;
      } catch (error) {
        console.error("Fetch ticket error:", error);
        return null;
      }
    },
    [axios, token]
  );

  return { createTicket, sendMessage, getTicketById, loading };
};