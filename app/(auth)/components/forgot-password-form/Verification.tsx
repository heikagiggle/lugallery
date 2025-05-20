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

const Verification = ({ onNextStep }: ContainerProps) => {
  const handler = useForm<OtpData>({
    resolver: zodResolver(OtpSchema),
    mode: "onChange",
  });

  const { control } = handler;

  const onSubmit = (data: OtpData) => {
    console.log(data);
    onNextStep();
  };

  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-3 w-full "
      >
        <h1 className="text-xl md:text-2xl text-[#006400] font-semibold text-center">
          Enter the verification code
        </h1>

        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Otp</FormLabel>
              <Input {...field} />
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

export default Verification;
