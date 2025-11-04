"use client";
import { useState } from "react";
import Artisans from "./components/Artisans";
import Sort from "./components/Filter";
import { FilterState } from "./components/data";

const Trainers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [filters, setFilters] = useState<FilterState>({
    title: null,
    state: null,
    lga: null,
  });

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div className="w-64 sticky top-0 max-h-screen overflow-y-auto border-r mr-4">
          <Sort
            closeSidebar={() => setIsSidebarOpen(false)}
            onFilterChange={setFilters}
          />
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:w-[calc(100%-16rem)]" : "w-full"
        }`}
      >
        <Artisans
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          filters={filters}
        />
      </div>
    </div>
  );
}

export default Trainers