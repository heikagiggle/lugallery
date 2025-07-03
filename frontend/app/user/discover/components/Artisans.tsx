"use client";
import ArtisanCard from "../../../components/cards/artisan/artisan-card";
import ArtisanCardSkeleton from "../../../components/cards/artisan/skeleton";
import { useEffect, useState } from "react";
import { artisanData, FilterState } from "./data";
import { Menu } from "lucide-react";
import Link from "next/link";

interface Props {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  filters: FilterState;
}

const Artisans = ({ toggleSidebar, isSidebarOpen, filters }: Props) => {
  const [loading, setLoading] = useState(true);
  const [artisans, setArtisans] = useState<typeof artisanData>([]);

  useEffect(() => {
    setTimeout(() => {
      setArtisans(artisanData);
      setLoading(false);
    }, 2000);
  }, []);

  const filteredArtisans = artisans.filter((a) => {
    return (
      (!filters.title || a.title === filters.title) &&
      (!filters.state || a.state === filters.state) &&
      (!filters.lga || a.lga === filters.lga)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#006400]">
        Meet Our Artisans
      </h1>
      <button
        className="flex items-center gap-x-2 text-[#344054] border rounded-md px-2 py-2 hover:bg-[#F2F2F2] cursor-pointer mb-5"
        onClick={toggleSidebar}
      >
        <Menu />
        <p>Customize View</p>
      </button>
      <div
        className={`grid gap-6 ${
          isSidebarOpen
            ? "lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
            : "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
        }`}
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ArtisanCardSkeleton key={i} />
          ))
        ) : filteredArtisans.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No artisans found for the selected filters.
          </p>
        ) : (
          filteredArtisans.map((artisan) => (
            <Link href={`/user/discover/${artisan.id}?title=${artisan.title}`} key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Artisans;
