export interface CreateTicketPayload {
  message: string;
}

export interface SendMessagePayload {
  ticketId: string;
  message: string;
}

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

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: SupportMessage;
}

export interface UseSupportChatResponse {
  createTicket: (payload: CreateTicketPayload) => Promise<string | null>;
  sendMessage: (payload: SendMessagePayload) => Promise<void>;
  loading: boolean;
}