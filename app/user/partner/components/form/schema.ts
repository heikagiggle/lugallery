import { artisanTitles } from "../../../../user/discover/components/data";
import { z } from "zod";

export const PartnerSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  artisan: z.enum(artisanTitles, {
    errorMap: () => ({ message: "Artisan category is required" }),
  }),
});

export type PartnerData = z.infer<typeof PartnerSchema>;
