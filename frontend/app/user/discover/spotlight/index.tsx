"use client";

import Image from "next/image";
import React from "react";
import { Artisan } from "../components/data";
import { UserButton } from "@/app/components/widgets/buttons/UserButton";
import Link from "next/link";

interface SpotlightUserProps {
  artisans: Artisan[];
}

const SpotlightUser: React.FC<SpotlightUserProps> = ({ artisans }) => {
  return (
    <section className="py-12 bg-white max-w-7xl mx-auto">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Spotlight 🌟</h2>
        <p className="text-gray-500 text-lg md:text-xl mb-8">
          Meet the creatives everyone is booking right now. These talented
          artisans are setting trends, delivering excellence, and making waves
          in their craft.
        </p>

        <div className="flex gap-6 overflow-x-auto snap-x pb-4 slim-scrollbar">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="min-w-[250px] bg-gray-50 rounded-xl shadow-sm border border-gray-100 snap-center flex-shrink-0 p-4 hover:shadow-md transition-shadow duration-200 space-y-2"
            >
              <div className="relative w-full h-44 mb-3">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>

              <h3 className="font-semibold text-gray-800">{artisan.name}</h3>
              <p className="text-gray-500 text-sm">{artisan.lga}</p>
              <Link
                href={`/user/discover/${artisan.id}?title=${artisan.title}`}
              >
                <UserButton className="py-1 w-full">View</UserButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightUser;
