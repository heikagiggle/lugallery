"use client";
import { useState, useRef, useMemo } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { menu } from "../utils/data";
import { useAuthContext } from "@/app/state/client/context";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));
  const { user } = useAuthContext();
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const dynamicMenu = useMemo(() => {
    return menu.map((item) => {
      if (item.title === "Login" && user) {
        return {
          ...item,
          title: user.name,
          path: "/account",
          isUser: true,
        };
      }
      return item;
    });
  }, [user]);

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
        <div className="fixed left-0 right-0 top-0 p-5 pt-0 bg-white transition z-[100] h-100vh shadow-md">
          <ul>
            <div className="flex items-center gap-x-32 md:gap-x-52 mt-6 mb-4">
              <RiCloseLine
                size={30}
                className="cursor-pointer hover:text-[#006400]"
                onClick={toggleMenu}
              />
            </div>
            {dynamicMenu.map((navItem, index) => (
              <li
                key={index}
                className={`w-full p-[0.08rem] transition-all text-sm ${
                  activeTab === index ? "text-[#006400] font-bold" : "text-black"
                } hover:text-[#006400]`}
              >
                <Link
                  href={`${navItem.path}`}
                  onClick={() => handleSetActiveTab(index)}
                  className="flex w-full p-3 items-center gap-x-2"
                >
                  {navItem.isUser ? (
                    <>
                      <span className="bg-[#006400] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {userInitial}
                      </span>
                      <span>{navItem.title}</span>
                    </>
                  ) : (
                    navItem.title
                  )}
                </Link>
              </li>
            ))}

            <p
              className=" pl-3 cursor-pointer hover:text-[#006400]"
              onClick={logout}
            >
              Log out
            </p>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
