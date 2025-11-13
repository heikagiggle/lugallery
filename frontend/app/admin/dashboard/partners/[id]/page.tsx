"use client";
import IdTopbar from "./components/IdTopbar";
import { useState } from "react";
import PersonalInfoCard from "./components/PersonalInfoCard";
import ProfessionalInfoCard from "./components/ProfessionalInfoCard";
import PortfolioSection from "./components/PortfolioSection";
import AdminNotes from "./components/AdminNotes";

const PartnerDetails = () => {
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  );

  const artisan = {
    first_name: "Chika",
    last_name: "Okafor",
    email: "chika.okafor@gmail.com",
    phone: "+234 812 345 6789",
    portfolio: "https://dribbble.com/chika",
    artisan: "Tailor",
    do_you_train: "yes" as const,
    willing_to_train: "no" as const,
    dateApplied: "2025-10-12T09:00:00Z",
    images: ["/tailor.jpg", "/tailor.jpg"],
  };

  const handleApprove = () => setStatus("Approved");
  const handleReject = () => setStatus("Rejected");
  return (
    <div>
      <IdTopbar
        status={status}
        dateApplied={artisan.dateApplied}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <PersonalInfoCard {...artisan} />
      <ProfessionalInfoCard {...artisan} />
      <PortfolioSection portfolio={artisan.portfolio} images={artisan.images} />
      <AdminNotes />
    </div>
  );
};

export default PartnerDetails;
