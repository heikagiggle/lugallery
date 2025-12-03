import { z } from "zod";

// USER schema
export const UserRegisterSchema = z.object({
  name: z.string().min(1, { message: "Your name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.literal("USER"),
});

// PARTNER schema
export const PartnerSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  portfolio: z.string().min(1, { message: "Portfolio link is required" }),
  artisan: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.literal("PARTNER"),
  do_you_train: z.enum(["yes", "no"]),
  willing_to_train: z.enum(["yes", "no"]),
});

//Career schema
export const CareerSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  gender: z.enum(["male", "female"], {
    message: "Gender is required",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.literal("CAREER"),
});

// ADMIN schema
export const AdminSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.literal("ADMIN"),
});
