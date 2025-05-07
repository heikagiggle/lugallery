"use client";
import React, { useState } from "react";
import { featured } from "../../utils/data";
import { UserButton } from "../../widgets/buttons/UserButton";
import Image from "next/image";
import FeaturedModal from "./components/Modal";

const FeaturedCollections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mt-4 mb-10 flex flex-col justify-center items-center mx-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">Featured</h1>
        <p className="text-base">Desired curated professionals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {featured.map((item) => (
          <div
            key={item.id}
            className="w-[320px] flex flex-col bg-white rounded-md shadow border border-[#e5e5e5] overflow-hidden"
          >
            {/* Image section */}
            <div className="w-full h-[200px] relative">
              <Image
                src={item.image}
                alt="featured-img"
                fill
                className="object-cover"
              />
            </div>

            {/* Content section */}
            <div className="flex flex-col justify-between flex-grow p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm line-clamp-1">{item.desc}</p>
              </div>
              <UserButton className="w-full"  onClick={() => setIsModalOpen(true)} >Explore</UserButton>
              {isModalOpen && (
                <FeaturedModal closeModal={() => setIsModalOpen(false)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;
