"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { capitalizeWords } from "../../../components/helper";

interface Apprentice {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
  state: string;
}

interface Props {
  apprentice: Apprentice;
}

const PersonalDetailsCard: React.FC<Props> = ({ apprentice }) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-background to-gray-50 shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-6 text-foreground border-b pb-3">
        Personal Details
      </h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center lg:text-left">
          <Image
            src={apprentice.image || "/default-avatar.png"}
            alt="Apprentice image"
            width={130}
            height={130}
            className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-100 shadow-sm"
          />
          <div className="mt-4 space-y-1">
            <p className="text-lg font-semibold text-gray-800">
              {apprentice.first_name} {apprentice.last_name}
            </p>
            <p className="text-sm text-secondary-foreground capitalize">
              {apprentice.gender}
            </p>
            <p className="text-xs text-muted-foreground">
              Apprentice ID: {apprentice.id}
            </p>
          </div>
        </div>

        {/* Divider for large screens */}
        <div className="hidden lg:block w-px bg-gray-200 h-32 mx-6" />

        {/* Details Grid */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 w-full max-w-xl text-gray-700">
          <div>
            <p className="text-sm text-secondary-foreground">Email</p>
            <p className="font-medium text-foreground break-all">{apprentice.email}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-foreground">Phone</p>
            <p className="font-medium text-foreground">{apprentice.phone}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-foreground">State</p>
            <p className="font-medium text-foreground">
              {capitalizeWords(apprentice.state)}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-secondary-foreground">Address</p>
            <p className="font-medium text-foreground leading-snug">{apprentice.address}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalDetailsCard;
