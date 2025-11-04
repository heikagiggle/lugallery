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
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { mutate } from "swr";

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

  const menuItems: NavItem[] = useMemo(
    () => [
      { url: "/account", Logo: ProfileIcon, label: "Profile" },
      { url: "/account/appearance", Logo: LocationIcon, label: "Appearance" },
      { url: "/account/chat", Logo: WalletIcon, label: "Chat/Complaints" },
      { url: "/account/password", Logo: LockIcon, label: "Change Password" },
      { url: "/account/delete-account", Logo: Star, label: "Delete Account" },
    ],
    []
  );

  const active = useMemo(() => {
    let active = null;
    for (const item of menuItems) {
      if (pathName.startsWith(item.url)) active = item.url;
    }
    return active;
  }, [pathName, menuItems]);

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("AUTH_ACCESS_TOKEN");
    mutate(() => true, undefined, { revalidate: false });
    toast.success("You are logged out.");
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed z-40 top-0 left-0 min-h-full w-72 text-[#3A3842] transition-transform transform duration-300 ease-in-out overflow-y-auto scrollbar-hide p-5",
        isOpen ? "translate-x-0 bg-white z-50 shadow-sm" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:block"
      )}
    >
      <div className="py-2">
        <h1 className="font-semibold text-[20px]">Emmanuella Okafor</h1>
        <p>Your personal account</p>
      </div>

      <ul className="mt-4 w-full flex flex-col gap-4 relative">
        {menuItems.map((nav) => (
          <Fragment key={nav.url}>
            <li
              className={cn(
                "border-transparent duration-200 ease-out text-sm w-full rounded-full py-1 hover:text-[#56479D] flex justify-between items-center hover:bg-[#56479D]/10 px-1",
                active === nav.url && "bg-[#F4F4F5] text-[#111013] font-medium"
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
        <h1 className="text-[#3A3842] text-sm">Log out</h1>
      </div>
    </aside>
  );
};

export default Sidebar;
