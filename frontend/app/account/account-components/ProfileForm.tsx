"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../../../components/ui/input";
import { UserButton } from "@/app/components/widgets/buttons/UserButton";
import { ImageUploader } from "@/app/components/widgets/uploader/image-uploader";

export const ProfileSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  // bio: z.string(),
  phone: z.string(),
  email: z.string(),
  profile_image: z
    .object({
      url: z.string().url().optional(),
      uploading: z.boolean().optional(),
    })
    .optional(),
});
export type ProfileData = z.infer<typeof ProfileSchema>;

const ProfileForm = () => {
  const handler = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      profile_image: undefined,
    },
  });

  const { control } = handler;

  const currentProfileImage = handler.watch("profile_image");

  const onSubmit = async (data: ProfileData) => {
    console.log(data);
  };

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-6 mt-8"
      >
        <ImageUploader
          name={"profile_image"}
          handler={handler}
          initialImageUrl={currentProfileImage?.url}
        />
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <UserButton>Save changes</UserButton>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
