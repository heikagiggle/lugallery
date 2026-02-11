"use client";

import { MenuIcon } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

import Sidebar from "./components/sidebar/sidebar";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { useAllProfile } from "../hooks/auth/profile";

interface AccountProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: AccountProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading } = useAllProfile();

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

  return (
    <>
      <Navigation />
      <div className="lg:hidden p-4 flex items-center gap-x-5 bg-background shadow-md">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-800 cursor-pointer"
        >
          <MenuIcon className="text-foreground" size={28} />
        </button>
        <div className="py-2">
          <h1 className="font-semibold text-[20px] text-foreground">
            {isLoading ? (
              <span className="inline-block h-5 w-32 animate-pulse rounded bg-muted" />
            ) : (
              (userName ?? "—")
            )}
          </h1>

          <p className="text-foreground">Your personal account</p>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div className="flex min-h-screen lg:pl-[10rem] xl:pl-[12rem] lg:pr-[8rem] xl:pr-[10rem]">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 min-h-screen w-full bg[pink]">
          <div className="lg:mt-20 my-8 py-5 ml-10 mr-10 lg:mr-0 lg:ml-20 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;
