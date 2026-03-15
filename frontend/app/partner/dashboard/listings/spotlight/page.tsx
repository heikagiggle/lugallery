"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Artisan {
  id: number;
  name: string;
  category: string;
  contacts: number;
  image: string;
}

// Dummy data
const dummyArtisans: Artisan[] = [
  {
    id: 1,
    name: "Ada Designs",
    category: "Fashion Designer",
    contacts: 120,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "John Metals",
    category: "Blacksmith",
    contacts: 95,
    image: "https://via.placeholder.com/300x200?text=John",
  },
  {
    id: 3,
    name: "Kemi Arts",
    category: "Painter",
    contacts: 80,
    image: "https://via.placeholder.com/300x200?text=Kemi",
  },
];

const SpotlightAdmin: React.FC = () => {
  const [spotlighted, setSpotlighted] = useState<Artisan[]>([dummyArtisans[0]]);

  // Type-safe toggle function
  const toggleSpotlight = (artisan: Artisan) => {
    setSpotlighted((prev) =>
      prev.some((a) => a.id === artisan.id)
        ? prev.filter((a) => a.id !== artisan.id)
        : [...prev, artisan],
    );
  };

  return (
    <div className="p-6 bg-muted min-h-screen">
      <h2 className="text-2xl font-bold text-shadow-foreground mb-2">
        Spotlight Management
      </h2>
      <p className="text-primary-foreground mb-6">
        Highlight your most sought-after artisans.
      </p>

      {/* Spotlighted Artisans */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Currently in Spotlight</h3>
        {spotlighted.length === 0 ? (
          <p className="text-gray-500 italic">No artisans spotlighted yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {spotlighted.map((artisan) => (
              <div
                key={artisan.id}
                className="bg-background shadow-sm rounded-lg p-4 border border-gray-100"
              >
                <div className="relative w-full h-40 mb-3">
                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <h4 className="font-medium text-primary-foreground">
                  {artisan.name}
                </h4>
                <p className="text-primary-foreground text-sm">
                  {artisan.category}
                </p>
                <p className="text-xs text-primary-foreground mt-1">
                  {artisan.contacts} contacts
                </p>
                <button
                  onClick={() => toggleSpotlight(artisan)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Contacted Artisans */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Top Contacted Artisans</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {dummyArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-background shadow-sm rounded-lg p-4 border border-gray-100"
            >
              <div className="relative w-full h-40 mb-3">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h4 className="font-medium text-secondary-foreground">
                {artisan.name}
              </h4>
              <p className="text-muted-foreground text-sm">
                {artisan.category}
              </p>
              <p className="text-xs text-primary-foreground mt-1">
                {artisan.contacts} contacts
              </p>
              <button
                onClick={() => toggleSpotlight(artisan)}
                className={`mt-3 ${
                  spotlighted.some((a) => a.id === artisan.id)
                    ? "bg-gray-400 hover:bg-muted"
                    : "bg-[#006400] hover:bg-green-700"
                } text-white px-3 py-1.5 text-sm rounded-md`}
              >
                {spotlighted.some((a) => a.id === artisan.id)
                  ? "Remove from Spotlight"
                  : "Add to Spotlight"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotlightAdmin;
