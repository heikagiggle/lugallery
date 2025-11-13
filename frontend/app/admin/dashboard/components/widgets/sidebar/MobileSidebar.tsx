import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { X } from "lucide-react";

const MobileSidebar = ({ onLinkClick }: { onLinkClick: () => void }) => {
  return (
    <div className="lg:hidden flex flex-col py-8 h-screen z-[999]">
      <div className="mb-5 flex justify-between items-center gap-x-2 px-5">
        <Link
          href="/"
          className="font-bold logo-font md:text-2xl text-white text-lg cursor-pointer"
        >
          Lugallery
        </Link>

        <div>
          <X className="text-white cursor-pointer" onClick={onLinkClick} />
        </div>
      </div>

      <SidebarMenu onLinkClick={onLinkClick} className="p-4 " />

      <div className="flex-grow" />

      <p className="cursor-pointer text-white w-fit hover:text-green-500 hover:font-semibold pl-6 py-1 text-sm md:text-base">
        Log out
      </p>
    </div>
  );
};

export default MobileSidebar;
