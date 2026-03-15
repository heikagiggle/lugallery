"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalDetailsCard from "./component/PersonalDetailsCard";
import ConnectedArtisansTable from "./component/ConnectedArtisansTable";
import ReviewDialog from "./component/ReviewDialog";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

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

interface ArtisanConnection {
  id: string;
  artisanName: string;
  review: string;
  rating: number;
  skill: string;
}

const apprentice: Apprentice = {
  id: "A-00921",
  first_name: "Chiamaka",
  last_name: "Okafor",
  email: "chiamaka.okafor@gmail.com",
  phone: "08123456789",
  address: "23 Freedom Estate, Enugu, Nigeria",
  gender: "female",
  state: "lagos",
  image: "/lawyer.jpeg",
};

const connectedArtisans: ArtisanConnection[] = [
  {
    id: "AR-001",
    artisanName: "John Ade",
    review: "A great mentor who was patient and made learning fun.",
    rating: 5,
    skill: "tailoring",
  },
  {
    id: "AR-002",
    artisanName: "Ngozi O.",
    review: "Good experience overall, though communication could be better.",
    rating: 4,
    skill: "photography",
  },
];

const ApprenticeDetailsPage = () => {
  const router = useRouter();
  const [selectedReview, setSelectedReview] =
    useState<ArtisanConnection | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <div className={"cursor-pointer"} onClick={() => router.back()}>
              <ChevronLeft />
            </div>
            <h1 className="text-2xl font-semibold">
              {apprentice.first_name} {apprentice.last_name}
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            Apprentice ID: {apprentice.id}
          </p>
        </div>
        <Button variant="destructive">Delete Apprentice</Button>
      </div>

      {/* Personal Details Card */}
      <PersonalDetailsCard apprentice={apprentice} />

      {/* Connections Table */}
      <ConnectedArtisansTable
        connectedArtisans={connectedArtisans}
        onView={(item) => setSelectedReview(item)}
      />

      {/* Review Modal */}
      <ReviewDialog
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
};

export default ApprenticeDetailsPage;
