"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { capitalizeWords, formatDate } from "../../../components/helper";
import { Calendar, Clock, LocationEdit } from "lucide-react";
import { Apprentice } from "./data";

interface Props {
  apprentice: Apprentice;
}

const PersonalDetailsCard: React.FC<Props> = ({ apprentice }) => {
  return (
    <Card className="p-4 shadow-md rounded-xl">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center lg:text-left">
          <div className="relative">
            <Image
              src={apprentice.image || "/default-avatar.png"}
              alt="Apprentice image"
              width={130}
              height={130}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-100 shadow-sm"
            />

            <button className="absolute bottom-0 right-0 translate-y-1/2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow">
              Pending
            </button>
          </div>
        </div>

        {/* Divider for large screens */}
        <div className="hidden lg:block w-px bg-gray-200 h-32 mx-6" />

        {/* Details Grid */}
        <div>
          <div className="mt-4 space-y-1">
            <p className="text-lg font-semibold text-secondary-foreground">
              {apprentice.first_name} {apprentice.last_name}
            </p>

            <div>
              <p className="text-sm text-secondary-foreground capitalize">
                Apprentice ID: {apprentice.id} <span className="ml-1">·</span>{" "}
                <span className="ml-1">{apprentice.gender} </span>{" "}
                <span className="ml-1">·</span>{" "}
                <span className="ml-1">Applied 2 days ago </span>{" "}
                {/* show days applied for pending only*/}
              </p>
            </div>

            <div className="mt-2 flex gap-2 flex-wrap">
              <button className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-xl text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Skill {/*Trade*/}
              </button>

              <button className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-xl text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Beginner {/*Level*/}
              </button>

              <button className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-xl text-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                {capitalizeWords(apprentice.state)} state{/*State*/}
              </button>

              <button className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-xl text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {capitalizeWords(apprentice.availability)} Availability
              </button>
            </div>

            <div className="mt-2 flex gap-x-5 gap-y-2 flex-wrap">
              <p className="flex items-center gap-1 text-sm">
                <LocationEdit className="w-3 h-3 text-secondary-foreground" />
                {capitalizeWords(apprentice.address)}
              </p>

              <button className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4" />
                Mon – Sat, ~6 hrs/day
              </button>

              <button className="flex items-center gap-1 text-sm">
                <Calendar className="w-3 h-3" />
                Can start: {formatDate(apprentice.startDate)}
              </button>

              <button className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4" />
                3-month commitment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalDetailsCard;
