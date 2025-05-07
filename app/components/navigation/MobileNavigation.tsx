"use client";
import { useState, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { menu } from "../utils/data";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActiveTab = (index: number) => {
    setActiveTab(index);
    setIsOpen(false);
  };
  const router = useRouter();

  const logout = () => {
    router.push("/login");
  };
  return (
    <div className="justify-end ">
      <Hamburger
        toggled={isOpen}
        size={20}
        toggle={() => setIsOpen(!isOpen)}
        direction="left"
        duration={0.8}
      />
      {isOpen && (
        <div className="fixed left-0 right-0 top-0 p-5 pt-0 bg-white transition z-[100] h-100vh">
          <ul>
            <div className="flex items-center gap-x-32 md:gap-x-52 mt-6 mb-8">
              <RiCloseLine
                size={20}
                className="cursor-pointer hover:text-red-500"
                onClick={toggleMenu}
              />
            </div>
            {menu.map((navItem, index) => (
              <li
                key={index}
                className={`w-full p-[0.08rem] transition-all text-sm ${
                  activeTab === index ? "text-red-500" : "text-black"
                } hover:text-red-500`}
              >
                <Link
                  href={`${navItem.path}`}
                  onClick={() => handleSetActiveTab(index)}
                  className="flex w-full p-5"
                >
                  {navItem.title}
                </Link>
              </li>
            ))}

            <p className=" pl-5 cursor-pointer" onClick={logout}>
              Log out
            </p>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
