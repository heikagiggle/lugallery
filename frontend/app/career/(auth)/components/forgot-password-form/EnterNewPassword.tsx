"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "../../../../components/widgets/buttons/UserButton";
import { PasswordInput } from "../widgets/PasswordInput";
import { SetNewPasswordData, SetNewPasswordSchema } from "../schema/schema";
import { useRouter } from "next/navigation";

const EnterNewPassword = () => {
  const router = useRouter();
  const handler = useForm<SetNewPasswordData>({
    resolver: zodResolver(SetNewPasswordSchema),
    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = async (data: SetNewPasswordData) => {
    console.log(data);
    router.push("/user/discover");
  };

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-3 w-full "
      >
        <h1 className="text-xl md:text-2xl text-[#006400] font-semibold text-center">
          Enter new password
        </h1>

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <PasswordInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <UserButton type="submit" className="w-full">
          Submit
        </UserButton>
      </form>
    </Form>
  );
};

export default EnterNewPassword;
