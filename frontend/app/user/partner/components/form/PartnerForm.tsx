"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { PartnerData, PartnerSchema } from "./schema";
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
import { artisanTitles } from "../../../discover/components/data";

const PartnerForm = () => {
  const handler = useForm<PartnerData>({
    resolver: zodResolver(PartnerSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = (data: PartnerData) => {
    console.log(data);
  };
  return (
    <Form {...handler}>
      <form
        onSubmit={handler.handleSubmit(onSubmit)}
        className="space-y-3 w-full mx-auto p-4 rounded-md my-5"
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
          name="artisan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What type of artisan are you?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your artisan category" />
                </SelectTrigger>
                <SelectContent>
                  {artisanTitles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio</FormLabel>
              <Input {...field} placeholder="Enter your portfolio link" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-5">
          <UserButton type="submit">Register</UserButton>
        </div>
      </form>
    </Form>
  );
};

export default PartnerForm;
