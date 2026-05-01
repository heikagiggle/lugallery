import { z } from "zod";

export const AddApprenticeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(10, { message: "Address number is required" }),
 gender: z.enum(["male", "female"], {
  error: "Gender is required",
}),
});

export type AddApprenticeData = z.infer<typeof AddApprenticeSchema>;
