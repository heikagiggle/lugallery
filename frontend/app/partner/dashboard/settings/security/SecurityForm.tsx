"use client";
import { PasswordInput } from "@/app/components/widgets/PasswordInput";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { UserButton } from "@/app/components/widgets/buttons/UserButton";

export const PasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});
export type PasswordData = z.infer<typeof PasswordSchema>;

const SecurityForm = () => {
  const handler = useForm<PasswordData>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PasswordData) => {
    console.log(data);
  };

  const { control } = handler;

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-6 bg-background mt-8 flex flex-col justify-center items-center w-full max-w-full md:max-w-lg mx-auto border border-gray-500 shadow-md px-3 py-6 rounded-md"
      >
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-semibold">Change Password</h1>
        </div>
        <FormField
          control={control}
          name="old_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Enter old password</FormLabel>
              <PasswordInput {...field} placeholder="old password" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Enter new password</FormLabel>
              <PasswordInput {...field} placeholder="New password" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full">
          <UserButton className="w-full">Change password</UserButton>
        </div>
      </form>
    </Form>
  );
};

export default SecurityForm;
