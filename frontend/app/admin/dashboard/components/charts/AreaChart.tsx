import React from 'react';
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  //   YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type CurveType =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

interface ChartConfig {
  key: string;
  color?: string;
  strokeWidth?: number;
  type?: CurveType;
  fillOpacity?: number;
}

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface AreaChartProps {
  data: DataPoint[];
  charts: ChartConfig[];
  className?: string;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
}

export function AreaChart({
  data,
  charts,
  className,
  margin = { top: 10, right: 0, left: 0, bottom: 0 },
}: AreaChartProps) {
  const formatNumber = (value: number) => value.toLocaleString();
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <ReAreaChart data={data} margin={margin}>
        <CartesianGrid stroke="none" />
        <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
        {/* <YAxis /> */}
        <Tooltip
          formatter={(value: number) => formatNumber(value)}
          //   labelFormatter={(label) => `Month: ${label}`}
        />
        {charts.map(
          ({
            key,
            color = '#8884d8',
            strokeWidth = 2,
            type = 'monotone',
            fillOpacity = 0,
          }) => (
            <Area
              key={key}
              type={type}
              dataKey={key}
              stroke={color}
              fill={color}
              fillOpacity={fillOpacity}
              strokeWidth={strokeWidth}
              activeDot={{ r: 6 }}
              name={key === 'uv' ? 'Active Users' : key}
            />
          )
        )}
      </ReAreaChart>
    </ResponsiveContainer>
  );
}
