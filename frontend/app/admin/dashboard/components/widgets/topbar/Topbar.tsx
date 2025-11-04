"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MailIcon } from "../icons/mail-icon";
import { SearchIcon } from "../icons/search-icon";
import { BellIcon } from "../icons/bell";
import { ChevronDown, Menu } from "lucide-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import { useSearch } from "../../../../../state/client/search-context";

const TopBar = () => {
  const router = useRouter();

  const [openProfile, setOpenProfile] = useState(false);
  const handleClick = () => setOpenProfile(!openProfile);
  const handleLogout = async () => router.push("/login");
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div
      className={`flex items-center py-4 justify-between sticky text-white z-[999]`}
    >
      <div className="lg:hidden block">
        <Menu
          className="text-black cursor-pointer mr-3"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="fixed right-[100px] w-[280px] left-0 top-0 p-5 pt-0 bg-[#006400]  transition transform 0.3s ease-in-out z-[100] h-full">
            <MobileSidebar onLinkClick={() => setIsOpen(false)} />
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <SearchIcon />
        </div>

        <input
          type="search"
          placeholder="Search ..."
          className="border border-[#E9F0FF] rounded-md px-1 py-2 pl-8 text-sm text-black w-full lg:w-[461px] outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <Link
          href={"/admin/dashboard/support"}
          className="relative cursor-pointer bg-white p-2 rounded-lg"
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
          className="relative cursor-pointer bg-white p-2 rounded-lg"
        >
          <BellIcon />
          <span className="absolute top-1 right-1 flex items-center justify-center">
            <span className="h-3 w-3 bg-white rounded-full flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full" />
            </span>
          </span>
        </Link>

        <div
          className="flex items-center borde border-[#e5e5e5]"
          onClick={handleClick}
        >
          <div className="cursor-pointer bg-white p-2 rounded-lg">
            <p className="text-base font-bold text-[#0D0D0D]">Giggle</p>
          </div>
          <div className="flex items-center gap-[15px] cursor-pointer">
            <ChevronDown className="text-black" />
            {openProfile && (
              <div className="bg-white text-black border text-sm absolute top-[56px] z-20 right-[20px] p-3 w-[100px] space-y-2">
                <Link
                  href="/admin/dashboard/settings/profile"
                  className="block cursor-pointer hover:text-green-500 font-semibold pb2"
                >
                  Settings
                </Link>
                <p
                  className="cursor-pointer hover:text-green-500 font-semibold"
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
