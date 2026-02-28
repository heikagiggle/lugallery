"use client";

import { type PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

export function AdminButton({
  children,
  type,
  onClick,
  className,
  disabled,
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-[#006400] text-white px-6 py-2 rounded-md flex justify-center items-center transition-colors duration-300 ease-in-out",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:text-[#e5e5e5] cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
}
