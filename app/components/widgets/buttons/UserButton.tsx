"use client";

import { type PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
};

export function UserButton({
  children,
  type,
  onClick,
  className,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        "bg-gradient-to-r from-black to-[#006400] text-white px-6 py-2 rounded-md  hover:text-[#e5e5e5] cursor-pointer flex justify-center items-center transition-colors duration-300 ease-in-out",
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
