import { z } from "zod";

export const CareerSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  password: z
    .string()
    .min(8, { message: "Password must contain 8 characters" }),
  // reason: z.string().min(1, { message: "Reason is required" }),
});

export type CareerData = z.infer<typeof CareerSchema>;
