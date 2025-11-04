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
    </>
  );
};
export default Discover;
