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
import { LoginData, LoginSchema } from "../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "../../../components/widgets/buttons/UserButton";
import { PasswordInput } from "../widgets/PasswordInput";

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
    <div>
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
      <p className="text-sm text-center mt-3">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#5603AD] font-medium hover:underline pl-1"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
