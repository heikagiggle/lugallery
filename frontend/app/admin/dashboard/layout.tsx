import { ReactNode } from "react";
import Sidebar from "./components/widgets/sidebar/Sidebar";
import Topbar from "./components/widgets/topbar/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex gap-x- min-h-screen bg-white overflow-x-hidden">
      <div>
        <Sidebar />
      </div>

      <main className="ml-[4%] lg:ml-[20%] w-full flex-1 flex flex-col min-h-screen mr-[4%]">
        <div className="border-b border-[#E5E5E5] bg[#effbf8]">
          <Topbar />
        </div>

        <div className=" h-full roundedxl py-5 overflow-y-auto bg[#effbf8]">
          {children}
        </div>
      </main>
    </div>
  );
}
