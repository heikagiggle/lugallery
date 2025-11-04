// src/components/AnalyticsCard.tsx (A reusable component for the metric summary)
import { Card } from '@/components/ui/card';
import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string; // e.g., "+5.2% from last week"
  isPositive: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change, isPositive }) => {
  return (
    <Card className="rounded-lg bg-white p-6 shadow-sm gap-3">
      <p className="text-lg font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
      <p className={`mt-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
    </Card>
  );
};

export default AnalyticsCard;