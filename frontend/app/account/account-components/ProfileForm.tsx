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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { UserButton } from "@/app/components/widgets/buttons/UserButton";
import { ImageUploader } from "@/app/components/widgets/uploader/image-uploader";
import { useAllProfile } from "../../hooks/auth";
import { useEffect } from "react";
import { useUpdateProfile } from "@/app/hooks/auth/profile/updateProfile";

export const ProfileSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  profile_image: z
    .object({
      url: z.string().url().optional(),
      uploading: z.boolean().optional(),
    })
    .optional(),
});
export type ProfileData = z.infer<typeof ProfileSchema>;

const ProfileForm = () => {
  const { data } = useAllProfile();
  const { updateProfile, loading } = useUpdateProfile();

  const handler = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      gender: undefined,
      profile_image: undefined,
    },
  });

  const { control } = handler;

  const currentProfileImage = handler.watch("profile_image");

  const onSubmit = async (data: ProfileData) => {
    const payload = {
      ...data,
      image: data.profile_image?.url ?? undefined,
    };

    console.log(payload);

    await updateProfile(payload);
  };

  useEffect(() => {
    if (!data) return;

    console.log("PROFILE DATA:", data);

    const profile = data.data ?? data;

    handler.reset({
      name: profile.userData?.name || "",
      phone: profile.userData?.phone || "",
      email: profile.email || "",
      gender:
        profile.gender === "male" || profile.gender === "female"
          ? profile.gender
          : "",
      profile_image: profile.image
        ? { url: profile.image, uploading: false }
        : undefined,
    });
  }, [data]);
  console.log(JSON.stringify(data, null, 2));

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
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
              <Input {...field} readOnly />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <UserButton loading={loading}>Save changes</UserButton>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
