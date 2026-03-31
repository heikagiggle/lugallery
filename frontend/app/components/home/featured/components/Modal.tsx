"use client";

import { UserButton } from "../../../widgets/buttons/UserButton";
import { Artisan, funDescriptions } from "../../../utils/data";
import React from "react";

const FeaturedModal = ({
  closeModal,
  artisan,
}: {
  closeModal: () => void;
  artisan: Artisan;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand/30 z-50 px-6">
      <div className="relative bg-background rounded-xl shadow-lg w-[90%] sm:max-w-lg max-h-[80vh] overflow-y-auto flex flex-col p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{artisan.title}</h1>
          <span
            className="cursor-pointer font-bold text-lg"
            onClick={closeModal}
          >
            ✖
          </span>
        </div>

        <div className="text-gray-700 mb-6 space-y-4">
          {/* Loop through each paragraph and apply margin between them */}
          {funDescriptions[artisan.id].split("\n\n").map((para, index) => (
            <p key={index} className="text-secondary-foreground">{para}</p>
          ))}
        </div>

        <div className="flex justify-center">
          {" "}
          <UserButton
            onClick={() => {
              // TODO: Replace with your route navigation later
              alert(`Connecting with ${artisan.title}... Coming soon!`);
            }}
            className="bg-brand"
          >
            Connect
          </UserButton>
        </div>
      </div>
    </div>
  );
};

export default FeaturedModal;
