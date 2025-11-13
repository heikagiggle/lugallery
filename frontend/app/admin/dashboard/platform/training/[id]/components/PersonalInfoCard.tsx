import { Card } from "@/components/ui/card";
import React from "react";
import { ArtisanWithStudentsProps } from "../../components/data";

interface PersonalInfoProps {
 artisan: ArtisanWithStudentsProps;
}

const PersonalInfoCard = ({ artisan}: PersonalInfoProps) => {

  return (
    <Card className="p-6 bg-white rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-2 gap-y-3 text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Name:</span> {artisan.name}
        </p>

        <p>
          <span className="font-medium text-gray-800">Email:</span> {artisan.email}
        </p>
        <p>
          <span className="font-medium text-gray-800">Last Name:</span> {artisan.skill}
        </p>
        <p>
          <span className="font-medium text-gray-800">state:</span> {artisan.state}
        </p>
         <p>
          <span className="font-medium text-gray-800">Name:</span> {artisan.address}
        </p>
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
