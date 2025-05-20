import { z } from "zod";

export const PartnerSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Partner title is required"),
  description: z.string().nonempty("Partner description is required"),
  images: z.array(z.string()).optional(),
  price: z.string(),
  discount: z.string().nullable().optional(),
  stock: z.string().optional(),
  size:z.string().optional(),
  
});

export type PartnerData = z.infer<typeof PartnerSchema>;
