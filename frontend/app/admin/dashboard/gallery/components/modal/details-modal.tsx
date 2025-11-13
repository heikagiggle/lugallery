"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminButton } from "@/app/components/widgets/buttons/AdminButton";
import { ArtisanProfile } from "../data";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";

interface ProfileDetailsProps {
  profile: ArtisanProfile;
  trigger: React.ReactNode;
  status?: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
}

const ProfileDetailsModal = ({
  trigger,
  profile,
  status = "Pending",
  rejectionReason = "",
  onApprove,
  onReject,
}: ProfileDetailsProps) => {
  const [open, setOpen] = useState(false);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [reason, setReason] = useState("");

  const statusColor =
    status === "Approved"
      ? "text-green-600 bg-green-100"
      : status === "Rejected"
      ? "text-red-600 bg-red-100"
      : "text-yellow-700 bg-yellow-100";

  const handleReject = () => {
    if (reason.trim() === "") return;
    onReject?.(reason);
    setShowRejectBox(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        side
        className="z-50 border-none max-w-2xl  overflow-y-auto p-8 shadow-lg"
      >
        <DialogTitle className="text-2xl font-semibold text-[#111013] mb-6">
          Artisan Profile
        </DialogTitle>

        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="w-full ">
            <div className="grid grid-cols-2 gap-3">
              {profile.images && profile.images.length > 0 ? (
                profile.images.slice(0, 4).map((img, i) =>
                  img ? (
                    <div
                      key={i}
                      className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={img}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="h-32 w-full rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500"
                    >
                      No image
                    </div>
                  )
                )
              ) : (
                <div className="col-span-2 h-32 flex items-center justify-center bg-gray-200 rounded-lg text-sm text-gray-500">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full space-y-3 text-sm text-[#3A3842]">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg text-[#111013]">
                {profile.name}
              </p>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${statusColor}`}
              >
                {status}
              </span>
            </div>

            <p className="text-[#666666]">{profile.title}</p>
            <p className="text-sm leading-relaxed">{profile.description}</p>

            <div className="mt-3">
              <p>
                <span className="font-medium">State:</span> {profile.state}
              </p>
              <p>
                <span className="font-medium">Local Gov:</span>{" "}
                {profile.localGov}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {profile.phone}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 pt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < profile.rating ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3 pt-3">
              {profile.socials.instagram && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-pink-500 text-lg hover:opacity-80" />
                </a>
              )}
              {profile.socials.facebook && (
                <a
                  href={profile.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-blue-600 text-lg hover:opacity-80" />
                </a>
              )}
              {profile.socials.tiktok && (
                <a
                  href={profile.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="text-black text-lg hover:opacity-80" />
                </a>
              )}
              {profile.socials.whatsapp && (
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-green-500 text-lg hover:opacity-80" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {status === "Pending" && (
          <div className="mt-8 space-y-3">
            <div className="flex justify-end gap-3">
              <AdminButton
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  onApprove?.();
                  setOpen(false);
                }}
              >
                Approve
              </AdminButton>
              <AdminButton
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => setShowRejectBox(true)}
              >
                Reject
              </AdminButton>
            </div>

            {/* Reject Reason Box */}
            {showRejectBox && (
              <div className="mt-3">
                <textarea
                  placeholder="Enter reason for rejection..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 resize-none text-sm"
                  rows={3}
                />
                <div className="flex justify-end mt-2 gap-2">
                  <AdminButton
                    className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                    onClick={() => setShowRejectBox(false)}
                  >
                    Cancel
                  </AdminButton>
                  <AdminButton
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={handleReject}
                  >
                    Submit
                  </AdminButton>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Show rejection reason if profile is rejected */}
        {status === "Rejected" && rejectionReason && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <p className="font-medium mb-1">Reason for rejection:</p>
            <p>{rejectionReason}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetailsModal;
