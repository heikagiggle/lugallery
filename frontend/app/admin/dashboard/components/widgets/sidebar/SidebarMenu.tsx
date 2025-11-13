"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface NavItem {
  url: string;
  label: string;
  subItems?: { url: string; label: string }[];
}

interface SidebarMenuProps {
  onLinkClick?: () => void;
  className?: string;
}

const SidebarMenu = ({ onLinkClick, className = "" }: SidebarMenuProps) => {
  const pathName = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const mainMenuItems: NavItem[] = useMemo(
    () => [
      { url: "/admin/dashboard", label: "Dashboard" },
      { url: "/admin/dashboard/users", label: "All Users" },
      { url: "/admin/dashboard/partners", label: "Artisans" },
      { url: "/admin/dashboard/apprentices", label: "Apprentices" },
      { url: "/admin/dashboard/gallery", label: "Gallery" },
      {
        url: "",
        label: "Listings",
        subItems: [
          // { url: "/admin/dashboard/listings/hot-deals", label: "Hot Deals" },
          {
            url: "/admin/dashboard/listings/announcement",
            label: "Announcements",
          },
          {
            url: "/admin/dashboard/listings/spotlight",
            label: "Spotlight",
          },
        ],
      },
      {
        url: "",
        label: "Platform Data",
        subItems: [
          {
            url: "/admin/dashboard/platform/categories",
            label: "Categories",
          },
          {
            url: "/admin/dashboard/platform/training",
            label: "Training",
          },
          {
            url: "/admin/dashboard/platform/mentors",
            label: "Partners & Mentors",
          },
        ],
      },
      {
        url: "",
        label: "Analytics & Feedback",
        subItems: [
          {
            url: "/admin/dashboard/analytics/analytics",
            label: "Analytics",
          },
          {
            url: "/admin/dashboard/analytics/reviews",
            label: "Reviews",
          },
          {
            url: "/admin/dashboard/analytics/feedback",
            label: "User feedback",
          },
        ],
      },
      { url: "/admin/dashboard/support", label: "Support" },
      {
        url: "",
        label: "Settings",
        subItems: [
          {
            url: "/admin/dashboard/settings/notification",
            label: "Notifications",
          },
          {
            url: "/admin/dashboard/settings/profile",
            label: "Profile",
          },
          {
            url: "/admin/dashboard/settings/security",
            label: "Security",
          },
        ],
      },
    ],
    []
  );

  const activeSubItemParent = useMemo(() => {
    for (const item of mainMenuItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (pathName.startsWith(subItem.url)) {
            return item.label;
          }
        }
      }
    }
    return null;
  }, [pathName, mainMenuItems]);

  const active = useMemo(() => {
    let active = null;
    for (const item of mainMenuItems) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (pathName.startsWith(subItem.url)) return subItem.url;
        }
      } else if (pathName.startsWith(item.url)) {
        active = item.url;
      }
    }
    return active;
  }, [pathName, mainMenuItems]);

  const handleClick = () => {
    if (onLinkClick) {
      setTimeout(onLinkClick, 300);
    }
  };

  return (
    <ul className={`flex flex-col gap-y-2 z-[999] ${className}`}>
      {mainMenuItems.map((nav) => (
        <li
          key={nav.label}
          className={cn(
            " hover:green-pink-100 hover:bg-opacity-20 border-transparent duration-200 ease-out md:text-base text-sm py-1 hover:text-green-500",
            active === nav.url
              ? "!bg-green-500/20 rounded-sm border-l-4 border-white"
              : ""
          )}
        >
          {nav.subItems ? (
            <div
              className={cn(
                "flex justify-between items-center w-full text-white md:text-base text-sm leading-6 px-2 cursor-pointer ",
                openDropdown === nav.label && "text-white font-medium ",
                activeSubItemParent === nav.label &&
                  openDropdown !== nav.label &&
                  "!bg-green-500/20 border-l-4 border-white"
              )}
              onClick={() => handleDropdown(nav.label)}
            >
              <span className="p-1 ">{nav.label}</span>
              <span
                className={cn(
                  "transform transition-transfor duration-200",
                  openDropdown === nav.label ? "rotate-180" : ""
                )}
              >
                <ChevronDown className="w-6" />
              </span>
            </div>
          ) : (
            <Link
              href={nav.url}
              className={cn(
                " items-center w-full text-white md:text-base text-sm leading-6 px-2 hover:text-green-500",
                active === nav.url && "text-[#f5f5f5] font-medium "
              )}
              onClick={handleClick}
            >
              <span className="p-1">{nav.label}</span>
            </Link>
          )}
          {nav.subItems && openDropdown === nav.label && (
            <ul className="mt-1 flex flex-col gap-y-1">
              {nav.subItems.map((subItem) => (
                <li
                  key={subItem.label}
                  className={cn(
                    "text-white hover:text-green-500 px-2 py-1 rounded-md",
                    active === subItem.url &&
                      "text-white font-medium !bg-green-500/20 rounded-sm ml-0 border-l-4 border-white"
                  )}
                  onClick={handleClick}
                >
                  <Link href={subItem.url} className="ml-3">
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
export default SidebarMenu;
