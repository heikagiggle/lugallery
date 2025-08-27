"use client";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "../../../components/widgets/buttons/UserButton";
import { z } from "zod";
import { PasswordInput } from "../../../components/widgets/PasswordInput";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(8),
});

export type LoginData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const handler = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };
  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-3 w-full "
      >
        <h1 className="text-xl md:text-2xl text-[#006400] font-semibold text-center">
          Welcome Back
        </h1>
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
        <p className="text-sm mt-3">
          Forgot password?
          <Link
            href="/forgot-password"
            className="text-[#5603AD] font-medium hover:underline pl-1"
          >
            Click here
          </Link>
        </p>
        <UserButton type="submit" className="w-full">
          Login
        </UserButton>
      </form>
    </Form>
  );
};

export default LoginForm;
