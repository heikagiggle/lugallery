'use client';
import { Card } from '@/components/ui/card';
import { AreaChart } from '../../charts/AreaChart';

const data = [
  { name: 'Jan', uv: 3300, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'Aug', uv: 2700, pv: 2400, amt: 2400 },
  { name: 'Sep', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Oct', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Nov', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Dec', uv: 1890, pv: 4800, amt: 2181 },
];

const chartsConfig = [
  {
    key: 'uv',
    color: '#006400',
    strokeWidth: 3,
  },
];

export default function Insights() {
  return (
    <Card className="gap-5 rounded-lg bg-white flex flex-col p-3 shadow-sm h-[23rem]">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <p>Insights</p>
          <div className="border rounded-full w-5 h-5 flex items-center justify-center">
            <span>!</span>
          </div>
        </div>

        <div className="bg-[#F2F2F2] flex items-center gap-x-2 px-2 py-2 rounded-md font-gothamM cursor-pointer">
          <p>User Engagement</p>
          {/* <ChevronDown /> */}
        </div>
      </div>

      <div className="flex gap-x-3 items-center">
        <h1 className="text-2xl font-gothamB">4,272</h1>
        <p className="border-2 border-[#15803D] px-2 py-0.5 bg-[#F0FDF4] rounded-md">
          2%
        </p>
      </div>

      <div className="h-[15rem]">
        <AreaChart
          data={data}
          charts={chartsConfig}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        />
      </div>
    </Card>
  );
}