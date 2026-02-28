"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { AdminButton } from "../../components/widgets/buttons/AdminButton";
import { useDeleteUserAccount } from "@/app/hooks/user/delete-account";

const reasons = [
  "I no longer use Lugallery",
  "I’m concerned about my privacy or data",
  "I’m getting too many emails or notifications",
  "I had issues using the app or site",
  "Other",
];

export const DeleteSchema = z.object({
  reasons: z.array(z.string()).min(1, "Please select at least one reason"),
});
export type DeleteData = z.infer<typeof DeleteSchema>;

const DeleteAccountForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useDeleteUserAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<DeleteData>({
    resolver: zodResolver(DeleteSchema),
    mode: "onChange",
  });

  // Watch the reasons array to enable/disable button
  const selectedReasons = watch("reasons") || [];

  const onSubmit = (data: DeleteData) => {
    mutate(
      { reasons: data.reasons },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

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
        {errors.reasons && (
          <p className="text-red-600 text-sm">{errors.reasons.message}</p>
        )}
      </div>

      <div className="flex w-full">
        <AdminButton
          className="bg-red-600 w-full sm:w-auto"
          disabled={isSubmitting || isPending || selectedReasons.length === 0}
        >
          {isPending ? "Deleting..." : "Delete account"}
        </AdminButton>
      </div>
    </form>
  );
};

export default DeleteAccountForm;
