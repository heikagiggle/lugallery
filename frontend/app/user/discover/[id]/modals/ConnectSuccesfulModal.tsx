"use client";
import React from "react";
import { UserButton } from "../../../../components/widgets/buttons/UserButton";

interface ConnectSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void; // triggers next step (review modal)
}

export const ConnectSuccessModal: React.FC<ConnectSuccessModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // trigger review modal after short delay if provided
    if (onContinue) {
      setTimeout(onContinue, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-3">Connection Successful</h3>
        <p className="text-secondary-foreground mb-4">
          Artisan has been contacted and will reach out to you shortly.
        </p>
        <div className="flex justify-end">
          <UserButton onClick={handleClose}>Close</UserButton>
        </div>
      </div>
    </div>
  );
};
