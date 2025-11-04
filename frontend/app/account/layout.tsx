"use client";

import { MenuIcon } from "lucide-react";
import { ReactNode, useState } from "react";

import Sidebar from "./components/sidebar/sidebar";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

interface AccountProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: AccountProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navigation />
      <div className="lg:hidden p-4 flex items-center gap-x-5 bg-white shadow-md">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-800 cursor-pointer"
        >
          <MenuIcon size={28} />
        </button>
        <div className="py-2">
          <h1 className="font-semibold text-[20px]">Emmanuella Okafor</h1>
          <p>Your personal account</p>
        </div>
      </div>

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
