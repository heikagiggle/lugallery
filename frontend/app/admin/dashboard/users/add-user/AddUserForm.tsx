"use client";

"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { AddUserData, AddUserSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { AdminButton } from "../../../../components/widgets/buttons/AdminButton";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AddUserForm = () => {
  const router = useRouter();

  const handler = useForm<AddUserData>({
    resolver: zodResolver(AddUserSchema),

    mode: "onChange",
  });
  const { control } = handler;

  const onSubmit = (data: AddUserData) => {
    console.log(data);
  };
  return (
    <div>
      <div className={"cursor-pointer flex"} onClick={() => router.back()}>
        <ChevronLeft /> <span className="pl-1">back</span>
      </div>
      <Form {...handler}>
        <form
          onSubmit={handler.handleSubmit(onSubmit)}
          className="space-y-5 w-full md:w-1/2 mx-auto flex flex-col justify-center p-4 rounded-md my-5 border border-[#e5e5e5]"
        >
          <h1 className="text-xl md:text-2xl  font-semibold text-center">
            Add New User
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Address</FormLabel>
                <Input {...field} placeholder="Enter user address" />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-5">
            <AdminButton type="submit">Submit</AdminButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddUserForm;
