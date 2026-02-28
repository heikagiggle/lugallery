"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { menu as staticMenu } from "../utils/data";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import MobileNavigation from "./MobileNavigation";
import { useAllProfile } from "../../hooks/auth";
import { useSearch } from "../../state";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pathName = usePathname();
  const router = useRouter();

  const { data } = useAllProfile();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Extract user name and trim to first name
  const userName = useMemo(() => {
    if (!data) return null;

    switch (data.role) {
      case "CAREER":
        return data.career?.first_name ?? null;
      case "ADMIN":
        return data.admin?.name?.split(" ")[0] ?? null;
      case "USER":
      case "PARTNER":
      default:
        return data.userData?.name?.split(" ")[0] ?? null;
    }
  }, [data]);

  const userInitial = userName?.charAt(0).toUpperCase() || "U";

  // Dynamically adjust menu based on auth status
  const menu = useMemo(() => {
    return staticMenu.map((item) => {
      if (item.title === "Login" && userName) {
        return {
          ...item,
          title: userName,
          path: "/account",
          isUser: true,
        };
      }
      return item;
    });
  }, [userName]);

  const active = useMemo(() => {
    let active = null;
    for (const item of menu) {
      if (pathName?.startsWith(item.path)) active = item.path;
    }
    return active;
  }, [pathName, menu]);

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const handleSetActiveTab = (path: string) => {
    setActiveTab(path);
  };

  return (
    <>
      {/* Fixed Nav */}
      <div className="fixed top-0 left-0 w-full z-[1000] bg-background shadow-sm">
        <div className="flex justify-between mx-5 md:mx-10 pt-7 pb-5 md:pt-6 md:pb-6">
          <div className="flex items-center gap-x-4 md:gap-x-10 w-full md:w-auto">
            <Link
              href="/"
              className="font-bold logo-font md:text-2xl text-lg cursor-pointer"
            >
              Lugallery
            </Link>

            <form
              className="relative w-full max-w-xs md:max-w-md"
              onSubmit={(e) => {
                e.preventDefault();

                if (!searchQuery.trim()) return;

                if (pathName !== "/user/discover") {
                  router.push(
                    `/user/discover?q=${encodeURIComponent(searchQuery)}`,
                  );
                }
              }}
            >
              <div className="absolute inset-y-0 start-0 flex items-center pl-3">
                <CiSearch size={20} />
              </div>
              <input
                type="search"
                className="w-full md:w-[350px] xl:w-[450px] pl-8 pr-2 md:pl-10 md:pr-12 py-2 text-foreground
              text-xs md:text-base outline-none border border-input bg-background rounded-lg"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex xl:gap-x-10 gap-x-3 text-[13px] xl:text-[15px] text-foreground py-3 px-10">
            {menu.map((navItem) => (
              <li key={navItem.path}>
                <Link href={navItem.path}>
                  <p
                    className={`hover:text-brand hover:font-semibold transition-colors ${
                      activeTab === navItem.path
                        ? "text-brand font-semibold"
                        : ""
                    }`}
                    onClick={() => handleSetActiveTab(navItem.path)}
                  >
                    {navItem.isUser ? (
                      <span className="flex items-center gap-2">
                        <span
                          className="bg-brand text-white rounded-full w-6 h-6 
                      flex items-center justify-center text-xs font-bold"
                        >
                          {userInitial}
                        </span>
                        <span className="hidden md:inline">{userName}</span>
                      </span>
                    ) : (
                      navItem.title
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Nav */}
          <div className="block lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>

      {/* Spacer — ensures content is not hidden under fixed header */}
      <div className="h-[95px]" />
    </>
  );
};

export default Navigation;
