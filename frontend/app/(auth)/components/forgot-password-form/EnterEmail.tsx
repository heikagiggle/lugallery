"use client";
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
import { ForgotPasswordSchema, RecoverPasswordData } from "../schema/schema";
import { ContainerProps } from "../../../utils/type";
import { useForgotPassword } from "../../../hooks/auth";
import { useEffect } from "react";

const EnterEmail = ({ onNextStep }: ContainerProps) => {
  const { forgot, loading, success } = useForgotPassword();
  const handler = useForm<RecoverPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = async (data: RecoverPasswordData) => {
    const payload = {
      email: data.email,
    };

    try {
      await forgot(payload);
      sessionStorage.setItem("email", data.email);
    } catch (error) {
      console.error("Failed to send reset email:", error);
    }
  };

  useEffect(() => {
    if (!loading && success) {
      // onNextStep && onNextStep();
      // if (onNextStep) {
      //   onNextStep();
      // }
      onNextStep?.();
    }
  }, [loading, onNextStep, success]);

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-3 w-full "
      >
        <h1 className="text-xl md:text-2xl text-brand font-semibold text-center">
          Enter your email address
        </h1>

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

        <UserButton type="submit" className="w-full" loading={loading}>
          Submit
        </UserButton>
      </form>
    </Form>
  );
};

export default EnterEmail;
