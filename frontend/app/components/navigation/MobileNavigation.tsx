"use client";
import { useState, useRef, useMemo } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { menu } from "../utils/data";
import { useAllProfile } from "../../hooks/auth/profile";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const ref = useRef(null);
  useClickAway(ref, () => setIsOpen(false));
  const { data, isLoading } = useAllProfile();

  const profileName = useMemo(() => {
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

  const userInitial = profileName?.charAt(0).toUpperCase() || "U";

  const dynamicMenu = useMemo(() => {
    return menu.map((item) => {
      if (item.title === "Login" && profileName && !isLoading) {
        return {
          ...item,
          title: profileName,
          path: "/account",
          isUser: true,
        };
      }
      return item;
    });
  }, [profileName, isLoading]);

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
        <div className="fixed left-0 right-0 top-0 p-5 pt-0 bg-background transition z-[100] h-100vh shadow-md">
          <ul>
            <div className="flex items-center gap-x-32 md:gap-x-52 mt-6 mb-4">
              <RiCloseLine
                size={30}
                className="cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            {dynamicMenu.map((navItem, index) => (
              <li
                key={index}
                className={`w-full p-[0.08rem] transition-all text-sm ${
                  activeTab === index
                    ? "text-[#006400] font-bold"
                    : "text-foreground"
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
