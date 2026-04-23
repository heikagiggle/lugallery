import { z } from "zod";

export const AddApprenticeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(10, { message: "Address number is required" }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
});

export type AddApprenticeData = z.infer<typeof AddApprenticeSchema>;

export const ArtisanProfileSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(300),
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(2, "Title is required"),
  state: z.string().min(1, "Please select a state"),
  lga: z.string().min(1, "Please select a local government"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  profileImage: z.any().optional(),
  galleryImages: z.array(z.any()).optional(),
 socialLinks: z.array(
  z.object({
    id: z.string(),
    platform: z.string(),
    url: z.string().url(),
  })
).optional()
});

export type ArtisanProfileData = z.infer<typeof ArtisanProfileSchema>;