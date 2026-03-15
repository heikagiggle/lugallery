import { Card } from "@/components/ui/card";
import React from "react";
import { ArtisanWithStudentsProps } from "../../components/data";

interface PersonalInfoProps {
  artisan: ArtisanWithStudentsProps;
}

const PersonalInfoCard = ({ artisan }: PersonalInfoProps) => {
  return (
    <Card className="p-6 rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-2 gap-y-3 text-muted-foreground">
        <p>
          <span className="font-medium text-secondary-foreground">Name:</span>{" "}
          {artisan.name}
        </p>

        <p>
          <span className="font-medium text-secondary-foreground">Email:</span>{" "}
          {artisan.email}
        </p>
        <p>
          <span className="font-medium text-secondary-foreground">Last Name:</span>{" "}
          {artisan.skill}
        </p>
        <p>
          <span className="font-medium text-secondary-foreground">state:</span>{" "}
          {artisan.state}
        </p>
        <p>
          <span className="font-medium text-secondary-foreground">Name:</span>{" "}
          {artisan.address}
        </p>
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
