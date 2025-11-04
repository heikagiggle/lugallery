import { ReactNode } from "react";
import Sidebar from "./components/widgets/sidebar/Sidebar";
import Topbar from "./components/widgets/topbar/Topbar";
import { SearchProvider } from "../../state/client/search-context";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: DashboardLayoutProps) {
  return (
    <SearchProvider>
      <div className="flex min-h-screen bg-white overflow-x-hidden">
        <div>
          <Sidebar />
        </div>

        <main className="ml-[4%] lg:ml-[20%] w-full flex-1 flex flex-col min-h-screen mr-[4%]">
          <div className="border-b border-[#E5E5E5]">
            <Topbar />
          </div>

          <div className=" h-full p-5 overflow-y-auto bggray-50">
            {children}
          </div>
        </main>
      </div>
    </SearchProvider>
  );
}
