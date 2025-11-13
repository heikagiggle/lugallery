import { Card } from '@/components/ui/card';
import React from 'react';

interface PersonalInfoProps {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const PersonalInfoCard = ({ first_name, last_name, email, phone }: PersonalInfoProps) => {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
      <div className="grid md:grid-cols-2 gap-y-3 text-gray-600">
        <p><span className="font-medium text-gray-800">First Name:</span> {first_name}</p>
        <p><span className="font-medium text-gray-800">Last Name:</span> {last_name}</p>
        <p><span className="font-medium text-gray-800">Email:</span> {email}</p>
        <p><span className="font-medium text-gray-800">Phone:</span> {phone}</p>
      </div>
    </Card>
  );
};

export default PersonalInfoCard;
