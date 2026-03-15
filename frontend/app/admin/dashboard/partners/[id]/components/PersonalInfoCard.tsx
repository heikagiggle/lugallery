import { Card } from "@/components/ui/card";
import React from "react";

interface PersonalInfoProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const PersonalInfoCard = ({
  first_name,
  last_name,
  email,
  phone,
}: PersonalInfoProps) => {
  return (
    <Card className="p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-2 gap-y-3 text-gray-600">
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">
            First Name:
          </span>{" "}
          {first_name}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">
            Last Name:
          </span>{" "}
          {last_name}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">Email:</span>{" "}
          {email}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-secondary-foreground">Phone:</span>{" "}
          {phone}
        </p>
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
