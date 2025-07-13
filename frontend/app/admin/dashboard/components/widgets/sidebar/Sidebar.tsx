
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col px-5 py-8 w-[18%] h-screen fixed bg-[#006400]">
      <div className="mb-10 font-bold logo-font md:text-2xl text-white text-lg cursor-pointer pl-2">
        Lugallery
      </div>
      <SidebarMenu />

      <div className="flex-grow" />

      <p className="cursor-pointer text-white w-fit hover:text-green-500 hover:font-semibold pl-6 py-1 text-sm md:text-base">
        Log out
      </p>
    </div>
  );
};

export default Sidebar;
