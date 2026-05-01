"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC, Fragment, useMemo } from "react";
import { IconProps } from "../icons/type";
import { Star } from "../icons/star-icon";
import { LocationIcon } from "../icons/location";
import { WalletIcon } from "../icons/wallet";
import { ProfileIcon } from "../icons/profile";
import { LockIcon } from "../icons/lock";
import { LogoutIcon } from "../icons/logout";
import { ChevronRight } from "../icons/chevron-right";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useAllProfile } from "@/app/hooks/auth/profile";
import { useAuthContext } from "@/app/state";
import { useQueryClient } from "@tanstack/react-query";

interface NavItem {
  url: string;
  Logo: FC<IconProps>;
  label: string;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathName = usePathname();
  const { data } = useAllProfile();
  const { setToken } = useAuthContext();
  const queryClient = useQueryClient();

  const menuItems: NavItem[] = useMemo(
    () => [
      { url: "/account", Logo: ProfileIcon, label: "Profile" },
      { url: "/account/appearance", Logo: LocationIcon, label: "Appearance" },
      { url: "/account/chat", Logo: WalletIcon, label: "Chat/Complaints" },
      { url: "/account/password", Logo: LockIcon, label: "Change Password" },
      { url: "/account/delete-account", Logo: Star, label: "Delete Account" },
    ],
    [],
  );

  const userName = useMemo(() => {
    if (!data) return null;

    switch (data.role) {
      case "CAREER":
        return data.career?.first_name ?? null;
      case "ADMIN":
        return data.admin?.name ?? null;
      case "USER":
      case "PARTNER":
      default:
        return data.userData?.name ?? null;
    }
  }, [data]);

  const active = useMemo(() => {
    let active = null;
    for (const item of menuItems) {
      if (pathName.startsWith(item.url)) active = item.url;
    }
    return active;
  }, [pathName, menuItems]);

  const router = useRouter();

  const handleLogout = () => {
    setToken(null);
    queryClient.clear();
    toast.success("You are logged out.");
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed z-40 top-0 left-0 min-h-screen w-72 text-[#3A3842] transition-transform transform duration-300 ease-in-out overflow-y-auto scrollbar-hide p-5",
        isOpen
          ? "translate-x-0 bg-background z-50 shadow-sm pt-32 lg:pt-5"
          : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:block shadow-none",
      )}
    >
      <div className="flex justify-between">
        <div className="py-2">
          <h1 className="font-semibold text-[20px] text-foreground">
            {userName}
          </h1>
          <p className="text-foreground">Your personal account</p>
        </div>
        <div>
          <X
            className="cursor-pointer text-foreground lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>

      <ul className="mt-4 w-full flex flex-col gap-4 relative">
        {menuItems.map((nav) => (
          <Fragment key={nav.url}>
            <li
              className={cn(
                "border-transparent duration-200 ease-out text-sm w-full rounded-full py-1 hover:text-brand flex justify-between items-center hover:bg-brand/10 px-1 text-foreground",
                active === nav.url && "bg-[#F4F4F5] text-[#111013] font-medium",
              )}
            >
              <Link
                href={nav.url}
                className="grid grid-cols-[1rem_minmax(5rem,_1fr)] gap-4 items-center text-sm p-2"
                onClick={() => setIsOpen(false)}
              >
                <nav.Logo
                  className="w-5"
                  fillColor={active === nav.url ? "#111013" : ""}
                />
                <span>{nav.label}</span>
              </Link>
              <ChevronRight />
            </li>
          </Fragment>
        ))}
      </ul>

      <div
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg p-2 w-fit mt-5 cursor-pointer"
      >
        <LogoutIcon />
        <h1 className="text-sm text-foreground">Log out</h1>
      </div>
    </aside>
  );
};

export default Sidebar;
