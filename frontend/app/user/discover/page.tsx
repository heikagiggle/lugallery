"use client";
import { useEffect, useState } from "react";
import Artisans from "./components/Artisans";
import Sort from "./components/Filter";
import { artisanData, FilterState } from "./components/data";
import SpotlightUser from "./spotlight";

interface Artisan {
  id: string;
  name: string;
  title: string;
  image: string;
  lga: string;
  state: string;
  rating: number;
  bio: string;
}

const dummySpotlighted: Artisan[] = [
  artisanData[0],
  artisanData[1],
  artisanData[4],
  artisanData[5],
  artisanData[2],
  artisanData[6],
];

const Discover = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [spotlighted, setSpotlighted] = useState<Artisan[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [filters, setFilters] = useState<FilterState>({
    title: null,
    state: null,
    lga: null,
  });

  useEffect(() => {
    // For now, load dummy spotlighted artisans
    setSpotlighted(dummySpotlighted);
  }, []);

  return (
    <>
      {spotlighted.length > 0 && <SpotlightUser artisans={spotlighted} />}
      <div className="relative flex">
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            className="
        fixed inset-y-0 left-0 z-40 w-full bg-background
        overflow-y-auto border-r
        sm:static sm:z-auto sm:w-64 sm:mr-4 pt-28
      "
          >
            <Sort
              closeSidebar={() => setIsSidebarOpen(false)}
              onFilterChange={setFilters}
            />
          </div>
        )}

        {/* Main content */}
        <div
          className={`transition-all duration-300 w-full ${
            isSidebarOpen ? "lg:w-[calc(100%-16rem)]" : ""
          }`}
        >
          <Artisans
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            filters={filters}
          />
        </div>
      </div>
    </>
  );
};
export default Discover;
