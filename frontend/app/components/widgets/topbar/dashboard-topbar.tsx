"use client";

import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ChevronLeft } from "lucide-react";

interface DashboardTopbarProps {
  rightContent?: React.ReactNode;
}

const DashboardTopbar = ({ rightContent }: DashboardTopbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const address =
    pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "";

  return (
    <div
      className={`flex justify-between top-0 left-0 right-0 `}
      style={{ zIndex: 999 }}
    >
      <div className="flex gap-x-1 items-center text-sm">
        {address !== "dashboard" && (
          <div
            className={twMerge("cursor-pointer")}
            onClick={() => router.back()}
          >
            <ChevronLeft />
          </div>
        )}

        <p className="text-[#0D0D0D] capitalize font-bold">
          {address || "Dashboard"}
        </p>
      </div>

      <div>{rightContent}</div>
    </div>
  );
};

export default DashboardTopbar;
