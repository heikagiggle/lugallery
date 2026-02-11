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
import { ContainerProps } from "../../../utils/type";
import { OtpData, OtpSchema } from "../schema/schema";
import { useCode } from "../../../hooks/auth/reset";
import { useEffect } from "react";

const Verification = ({ onNextStep }: ContainerProps) => {
  const { code, loading, success } = useCode();
  const handler = useForm<OtpData>({
    resolver: zodResolver(OtpSchema),
    mode: "onChange",
  });

  const { control } = handler;

  const onSubmit = (data: OtpData) => {
    const email = sessionStorage.getItem("email") || "";
    const payload = {
      email,
      otp: data.otp,
    };
    void code(payload);
    sessionStorage.setItem("otp", data.otp);
  };

  useEffect(() => {
    if (!loading && success) {
      onNextStep && onNextStep();
    }
  }, [loading, onNextStep, success]);

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-3 w-full "
      >
        <h1 className="text-xl md:text-2xl text-brand font-semibold text-center">
          Enter the verification code
        </h1>

        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Otp</FormLabel>
              <Input
                {...field}
                placeholder="Enter the code sent to your email"
              />
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

export default Verification;
