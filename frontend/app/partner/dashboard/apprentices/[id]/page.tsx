"use client";

import { useState, use } from "react"; // ✅ import use
import { Button } from "@/components/ui/button";
import PersonalDetailsCard from "./component/PersonalDetailsCard";
import ReviewDialog from "./component/ReviewDialog";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { AdminButton } from "@/app/components/widgets/buttons/AdminButton";
import {
  apprentices,
  ArtisanConnection,
} from "./component/data";
import Bio from "./component/Bio";
import MessagesAndNotes from "./component/MessagesAndNotes";
import Availability from "./component/Availability";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const ApprenticeDetailsPage = ({ params }: PageProps) => {
  const router = useRouter();

  const { id } = use(params);

  const [selectedReview, setSelectedReview] =
    useState<ArtisanConnection | null>(null);

  const apprentice = apprentices.find((a) => a.id === id);

  if (!apprentice) {
    return <div className="p-6">Apprentice not found</div>;
  }

  return (
    <div className="space-y-6 pb-24 sm:pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft />
          </div>

          <h1 className="text-lg sm:text-2xl font-semibold truncate">
            {apprentice.first_name} {apprentice.last_name}
          </h1>
        </div>

        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-2">
          <Button>Send Message</Button>
          <Button variant="destructive">Reject Apprentice</Button>
          <AdminButton>Accept Apprentice</AdminButton>
        </div>
      </div>

      <PersonalDetailsCard apprentice={apprentice} />
      <Bio apprentice={apprentice} />
      <Availability apprentice={apprentice} />
      <MessagesAndNotes apprentice={apprentice} />

      <ReviewDialog
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />

      <div className="bottom-0 left-0 right-0 bg-white flex flex-col gap-2 sm:hidden">
        <Button className="w-full">Send Message</Button>
        <Button variant="destructive" className="w-full">
          Reject Apprentice
        </Button>
        <AdminButton className="w-full">Accept Apprentice</AdminButton>
      </div>
    </div>
  );
};

export default ApprenticeDetailsPage;
