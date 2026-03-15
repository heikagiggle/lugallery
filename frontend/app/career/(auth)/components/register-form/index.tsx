"use client";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { RegisterData, RegisterSchema } from "../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "../../../../components/widgets/buttons/UserButton";
import { PasswordInput } from "../widgets/PasswordInput";

const RegisterForm = () => {
  const handler = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = (data: RegisterData) => {
    console.log(data);
  };
  return (
    <>
      <Form {...handler}>
        <form
          onSubmit={handler.handleSubmit(onSubmit)}
          className="space-y-3 w-full "
        >
          <h1 className="text-xl md:text-2xl text-[#006400] font-semibold text-center">
            Hello Admin :)
          </h1>
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

          <UserButton type="submit" className="w-full mt-5">
            Register
          </UserButton>
        </form>
      </Form>
      <p className="text-sm text-center mt-3">
        Already have an account?{" "}
        <Link
          href="/admin/login"
          className="text-[#5603AD] font-medium hover:underline pl-1"
        >
          Login here
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
