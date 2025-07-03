import { z } from "zod";

export const PartnerSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  reason: z.string().optional(),
});

export type PartnerData = z.infer<typeof PartnerSchema>;
