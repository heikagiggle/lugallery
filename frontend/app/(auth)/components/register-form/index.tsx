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
import { RegisterData, RegisterSchema } from "../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "../../../components/widgets/buttons/UserButton";
import { PasswordInput } from "../widgets/PasswordInput";
import { useRegister } from "../../../hooks/auth";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { signUp, loading } = useRegister();
  const router = useRouter();
  const handler = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = async (data: RegisterData) => {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: "USER",
      });
      router.push("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <Form {...handler}>
        <form
          onSubmit={handler.handleSubmit(onSubmit)}
          className="space-y-3 w-full "
        >
          <h1 className="text-xl md:text-2xl text-brand font-semibold text-center">
            Create Account
          </h1>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder="Enter your name" />
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
                <Input {...field} placeholder="Enter your email" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <Input {...field} placeholder="Enter your phone number" />
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
                <PasswordInput {...field} placeholder="Enter your password" />
                <FormMessage />
              </FormItem>
            )}
          />

          <UserButton type="submit" className="w-full mt-5" loading={loading}>
            Register
          </UserButton>
        </form>
      </Form>
      <p className="text-sm text-center mt-3">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:underline pl-1"
        >
          Login here
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
