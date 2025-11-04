'use client'
import { Card } from '@/components/ui/card';
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface DailyActivity {
  name: string; 
  'Artisan Signups': number;
  'Apprentice Signups': number;
  'User Signups': number;
}

const data: DailyActivity[] = [
  { name: 'Mon', 'Artisan Signups': 40, 'Apprentice Signups': 24, 'User Signups': 20 },
  { name: 'Tue', 'Artisan Signups': 30, 'Apprentice Signups': 13, 'User Signups': 25 },
  { name: 'Wed', 'Artisan Signups': 20, 'Apprentice Signups': 98, 'User Signups': 70 },
  { name: 'Thu', 'Artisan Signups': 27, 'Apprentice Signups': 39, 'User Signups': 35 },
  { name: 'Fri', 'Artisan Signups': 18, 'Apprentice Signups': 48, 'User Signups': 40 },
  { name: 'Sat', 'Artisan Signups': 23, 'Apprentice Signups': 38, 'User Signups': 30 },
  { name: 'Sun', 'Artisan Signups': 34, 'Apprentice Signups': 43, 'User Signups': 45 },
];

const UserActivityChart: React.FC = () => {
  return (
    <Card className="h-96 w-full bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Weekly Signup Activity
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorArtisan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorApprentice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />

          <Area
            type="monotone"
            dataKey="Artisan Signups"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorArtisan)"
          />
          <Area
            type="monotone"
            dataKey="Apprentice Signups"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorApprentice)"
          />
          <Area
            type="monotone"
            dataKey="User Signups"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#colorUser)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default UserActivityChart;
