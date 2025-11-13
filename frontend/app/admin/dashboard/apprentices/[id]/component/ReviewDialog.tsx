"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";

interface ArtisanConnection {
  artisanName: string;
  review: string;
  rating: number;
}

interface Props {
  review: ArtisanConnection | null;
  onClose: () => void;
}

const ReviewDialog: React.FC<Props> = ({ review, onClose }) => {
  return (
    <Dialog open={!!review} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        {review && (
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Artisan:</span>{" "}
              {review.artisanName}
            </p>
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <p>{review.review}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
