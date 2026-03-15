import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";

const Navigation = () => {
  return (
    <div className="flex justify-between  mx-5 md:mx-10 pt-7 pb-5 md:pt-6 md:pb-6">
      <div className="flex items-center gap-x-4 md:gap-x-10 w-full md:w-auto">
        <Link
          href="/"
          className="font-bold logo-font md:text-2xl text-lg cursor-pointer"
        >
          Lugallery
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <Globe />
        <p>ENG</p>
        <ChevronDown className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navigation;
