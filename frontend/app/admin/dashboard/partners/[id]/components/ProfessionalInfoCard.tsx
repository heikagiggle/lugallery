import { Card } from '@/components/ui/card';
import React from 'react';

interface ProfessionalInfoProps {
  artisan: string;
  do_you_train: 'yes' | 'no';
  willing_to_train: 'yes' | 'no';
}

const ProfessionalInfoCard = ({
  artisan,
  do_you_train,
  willing_to_train,
}: ProfessionalInfoProps) => {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Professional Information</h3>
      <div className="grid md:grid-cols-2 gap-y-3 text-gray-600">
        <p><span className="font-medium text-gray-800">Artisan Category:</span> {artisan}</p>
        <p>
          <span className="font-medium text-gray-800">Do you train apprentices:</span>{' '}
          {do_you_train === 'yes' ? 'Yes' : 'No'}
        </p>
        <p>
          <span className="font-medium text-gray-800">Willing to train others:</span>{' '}
          {willing_to_train === 'yes' ? 'Yes' : 'No'}
        </p>
      </div>
    </Card>
  );
};

export default ProfessionalInfoCard;
