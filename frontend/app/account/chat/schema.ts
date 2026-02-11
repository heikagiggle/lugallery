import z from "zod";

export const SupportMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message is too long"),
});

export type SupportMessageData = z.infer<typeof SupportMessageSchema>;
