"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MailIcon } from "../icons/mail-icon";
import { SearchIcon } from "../icons/search-icon";
import { BellIcon } from "../icons/bell";
import { ChevronDown, MenuIcon, Sun, Moon } from "lucide-react";
import { useSearch } from "../../../../../state/client/search-context";
import { useAllProfile } from "../../../../../../app/hooks/auth";

interface TopBarProps {
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
}

const TopBar = ({ setIsSidebarOpen, isSidebarOpen }: TopBarProps) => {
  const router = useRouter();
  const { data } = useAllProfile();
  const [openProfile, setOpenProfile] = useState(false);
  const handleClick = () => setOpenProfile(!openProfile);
  const handleLogout = async () => router.push("/login");
  const { searchQuery, setSearchQuery } = useSearch();

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`flex items-center py-4 justify-between sticky pl-1 lg:pl-10 border-b border-input pr-5 sm:pr-10 lg:pr-4`}
    >
      <div className="lg:hidden p-4 flex items-center gap-x-5">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-sidebar-foreground cursor-pointer"
        >
          <MenuIcon size={28} />
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <SearchIcon />
        </div>

        <input
          type="search"
          placeholder="Search ..."
          className="border border-[#E9F0FF] rounded-md px-1 py-2 pl-8 text-sm text-foreground w-full lg:w-[461px] outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <Link
          href={"/admin/dashboard/support"}
          className="relative cursor-pointer p-2 rounded-lg"
        >
          <MailIcon />
          <span className="absolute top-1 right-1 flex items-center justify-center">
            <span className="h-3 w-3 bg-white rounded-full flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full" />
            </span>
          </span>
        </Link>

        <Link
          href={"/admin/dashboard/settings/notification"}
          className="relative cursor-pointer p-2 rounded-lg"
        >
          <BellIcon />
          <span className="absolute top-1 right-1 flex items-center justify-center">
            <span className="h-3 w-3 bg-white rounded-full flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full" />
            </span>
          </span>
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-foreground" />
          ) : (
            <Moon size={18} className="text-foreground" />
          )}
        </button>

        <div
          className="flex items-center borde border-input"
          onClick={handleClick}
        >
          <div className="cursor-pointer p-2 rounded-lg">
            <p className="text-base font-bold text-foreground">
              {" "}
              {data?.admin?.name ?? ""}
            </p>
          </div>
          <div className="flex items-center gap-[15px] cursor-pointer">
            <ChevronDown className="text-foreground" />
            {openProfile && (
              <div className="bg-background text-black border border-border text-sm absolute top-[56px] z-20 right-[20px] p-3 w-[100px] space-y-2">
                <Link
                  href="/admin/dashboard/settings/profile"
                  className="block cursor-pointer hover:text-green-500 text-foreground font-semibold pb2"
                >
                  Settings
                </Link>
                <p
                  className="cursor-pointer text-foreground hover:text-green-500 font-semibold"
                  onClick={handleLogout}
                >
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>

        {/* <div className="lg:hidden block">
          <Menu
            className="text-black cursor-pointer -right-[200px]"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="fixed right-[100px] w-[280px] left-0 top-0 p-5 pt-0 bg-[#006400]  transition transform 0.3s ease-in-out z-[100] h-full">
              <MobileSidebar onLinkClick={() => setIsOpen(false)} />
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
