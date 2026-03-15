"use client";
import { ReactNode, useState } from "react";
import Sidebar from "./components/widgets/sidebar/Sidebar";
import Topbar from "./components/widgets/topbar/Topbar";
import { SearchProvider } from "../../state/client/search-context";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SearchProvider>
      <div className="flex bg-background min-h-screen overflow-x-hidden">
        <div>
          {" "}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        <main className="ml-[2%] lg:ml-[20%] w-full flex-1 flex flex-col min-h-screen mr-[2%]">
          <div>
            <Topbar
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
          <div className="p-6 h-full overflow-y-auto">{children}</div>
        </main>
      </div>
    </SearchProvider>
  );
}
