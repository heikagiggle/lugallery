"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { menu } from "../utils/data";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import MobileNavigation from "./MobileNavigation";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pathName = usePathname();

  const active = useMemo(() => {
    let active = null;

    for (const item of menu) {
      if (pathName?.startsWith(item.path)) active = item.path;
    }

    return active;
  }, [pathName]);

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const handleSetActiveTab = (path: string) => {
    setActiveTab(path);
  };
  return (
    <div className="flex justify-between  mx-5 md:mx-10 pt-7 pb-5 md:pt-6 md:pb-6">
      <div className="flex items-center gap-x-4 md:gap-x-10 w-full md:w-auto">
        <Link href="/" className="font-bold md:text-2xl text-lg cursor-pointer">
          Lugallery
        </Link>
        <div className="relative w-full max-w-xs md:max-w-md">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3">
            <CiSearch size={20} />
          </div>
          <input
            type="search"
            className="w-full md:w-[350px] xl:w-[450px] pl-8 pr-2  md:pl-10 md:pr-12 py-2 text-xs md:text-base outline-none border border-[#e5e5e5] bg-white rounded-lg"
            placeholder="Search here"
          />
        </div>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex xl:gap-x-10 gap-x-3 text-[13px] xl:text-[15px] text-black py-3 px-10">
        {menu.map((navItem) => (
          <li key={navItem.path}>
            <Link href={navItem.path}>
              <p
                className={`hover:text-[#006400] hover:font-semibold transition-colors ${
                  activeTab === navItem.path
                    ? "text-[#006400] font-semibold"
                    : ""
                }`}
                onClick={() => handleSetActiveTab(navItem.path)}
              >
                {navItem.title}
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
  );
};

export default Navigation;
