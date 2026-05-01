"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { CareerData, CareerSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { UserButton } from "../../../../components/widgets/buttons/UserButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "../../../../hooks/auth";
import { useEffect } from "react";
import { PasswordInput } from "../../../../components/widgets/PasswordInput";

const CareerForm = () => {
  const { signUp, loading, success } = useRegister();
  const router = useRouter();
  const handler = useForm<CareerData>({
    resolver: zodResolver(CareerSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = async (data: CareerData) => {
    try {
      await signUp({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        role: "CAREER",
      });
      console.log(data);
    } catch (e) {
      console.error("registration failed", e);
    }
  };

  useEffect(() => {
    if (!loading && success) {
      router.push("/user/discover-trainers");
    }
  }, [loading, success]);

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto p-4 rounded-md my-3"
      >
        <h1 className="text-xl md:text-2xl  font-semibold text-center">
          Start your journey
        </h1>
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <Input {...field} placeholder="Enter your first name" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <Input {...field} placeholder="Enter your last name" />
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
              <Input {...field} placeholder="Enter your email address" />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
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
        {/* <FormField
          control={control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to learn this trade?</FormLabel>
              <textarea
                {...field}
                placeholder="Why do you want to learn this trade?"
                className="w-full border border-gray-300 rounded-lg p-2 resize-none text-sm mt-1 outline-none"
                rows={3}
              />
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <p className="my-2">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-600 hover:underline">
            Login here
          </Link>{" "}
        </p>

        <div className="flex justify-end mt-5">
          <UserButton type="submit" loading={loading}>
            Register
          </UserButton>
        </div>
      </form>
    </Form>
  );
};

export default CareerForm;
