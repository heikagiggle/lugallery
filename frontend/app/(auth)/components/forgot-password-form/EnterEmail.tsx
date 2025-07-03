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

const EnterEmail = ({ onNextStep }: ContainerProps) => {
  const handler = useForm<RecoverPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = (data: RecoverPasswordData) => {
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
          Enter your email address
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

        <UserButton type="submit" className="w-full">
          Submit
        </UserButton>
      </form>
    </Form>
  );
};

export default EnterEmail;
