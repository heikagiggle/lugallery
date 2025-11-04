"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { AdminButton } from "../../components/widgets/buttons/AdminButton";

// Schema definition
export const DeleteSchema = z.object({
  reasons: z.array(z.string()).optional(),
});
export type DeleteData = z.infer<typeof DeleteSchema>;

const DeleteAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DeleteData>({
    resolver: zodResolver(DeleteSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DeleteData) => {
    console.log("Form submitted:", data);
  };

  const reasons = [
    "I no longer use Lugallery",
    "I’m concerned about my privacy or data",
    "I’m getting too many emails or notifications",
    "I had issues using the app or site",
    "Other",
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-20 mt-4 flex flex-col w-full"
    >
      <div className="space-y-3 px-1">
        {reasons.map((reason, index) => (
          <label
            key={index}
            className="flex items-center gap-x-4 cursor-pointer"
          >
            <input
              type="checkbox"
              value={reason}
              {...register("reasons")}
              className="w-4 h-4 scale-125 accent-[#006400]"
            />
            <p>{reason}</p>
          </label>
        ))}
      </div>

      <div className="flex w-full">
        <AdminButton
          className="bg-red-600 w-full sm:w-auto"
          disabled={isSubmitting}
        >
          Delete account
        </AdminButton>
      </div>
    </form>
  );
};

export default DeleteAccountForm;
