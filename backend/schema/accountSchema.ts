import { z } from "zod";

export const DeleteAccountSchema = z.object({
  reasons: z.array(z.string()).optional(),
});

export const ChangePasswordSchema = z.object({
  old_password: z.string().min(6, "Enter old password"),
  new_password: z.string().min(8, "New password must be at least 8 characters"),
});

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

export const CreateTicketSchema = z.object({
  message: z.string().min(5, "Message is too short"),
});

export const SendMessageSchema = z.object({
  ticketId: z.string().uuid(),
  message: z.string().min(1, "Message cannot be empty"),
});
