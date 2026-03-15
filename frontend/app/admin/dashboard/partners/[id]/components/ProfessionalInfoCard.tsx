import { Card } from "@/components/ui/card";
import React from "react";

interface ProfessionalInfoProps {
  artisan: string;
  do_you_train: "yes" | "no";
  willing_to_train: "yes" | "no";
}

const ProfessionalInfoCard = ({
  artisan,
  do_you_train,
  willing_to_train,
}: ProfessionalInfoProps) => {
  return (
    <Card className="p-6 rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Professional Information
      </h3>
      <div className="grid md:grid-cols-2 gap-y-3 text-gray-600">
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">Artisan Category:</span>{" "}
          {artisan}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">
            Do you train apprentices:
          </span>{" "}
          {do_you_train === "yes" ? "Yes" : "No"}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">
            Willing to train others:
          </span>{" "}
          {willing_to_train === "yes" ? "Yes" : "No"}
        </p>
      </div>
    </Card>
  );
};

export default ProfessionalInfoCard;
