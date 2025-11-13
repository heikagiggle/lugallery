'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TopbarProps {
  status: 'Pending' | 'Approved' | 'Rejected';
  dateApplied: string;
  onApprove: () => void;
  onReject: () => void;
}

const IdTopbar = ({ status, dateApplied, onApprove, onReject }: TopbarProps) => {
  const router = useRouter();

  const statusColor =
    status === 'Approved'
      ? 'bg-green-100 text-green-700'
      : status === 'Rejected'
      ? 'bg-red-100 text-red-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-1 w-fit"
        >
          <ArrowLeft size={16} /> Back
        </Button>

        <div className="flex items-center gap-2">
          <Badge className={statusColor}>{status}</Badge>
          <p className="text-sm text-gray-500">
            Applied on {new Date(dateApplied).toDateString()}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          className="border-green-600 text-green-600 w-full sm:w-auto"
          onClick={onApprove}
        >
          Approve
        </Button>
        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={onReject}
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default IdTopbar;
