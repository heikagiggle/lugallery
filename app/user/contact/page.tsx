"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { PartnerData, PartnerSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "../../components/widgets/buttons/UserButton";

const Contact = () => {
  const handler = useForm<PartnerData>({
    resolver: zodResolver(PartnerSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = (data: PartnerData) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center min--screen py-16 px-6 sm:px-12 lg:px-24">
      <Form {...handler}>
        <form
          onSubmit={handler.handleSubmit(onSubmit)}
          className="space-y-3 w-full max-w-2xl mx-auto border p-4 rounded-md"
        >
          <h1 className="text-xl md:text-2xl  font-semibold text-center">
            Contact us form
          </h1>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name and Last name</FormLabel>
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
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for contacting us</FormLabel>
                {/* <Input {...field} /> */}
                <textarea
                  {...field}
                  rows={4} // Set the height of the textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <UserButton type="submit">Submit</UserButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Contact;
