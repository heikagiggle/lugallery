"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface SkillData {
  name: string;
  value: number;
}

const COLORS = ["#4F46E5", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"];

const ApprenticeActvityChart = () => {
  const skillData: SkillData[] = [
    { name: "Tailoring", value: 360 },
    { name: "Painting", value: 240 },
    { name: "Woodwork", value: 216 },
    { name: "Sculpting", value: 180 },
    { name: "Others", value: 50 },
  ];

  const total = skillData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="w-full bg-white p-4 rounded-lg shadow-md">
      <CardHeader className=" text-gray-700 mb-4">
        <h2 className="text-lg font-semibold">Apprentice Activity</h2>
        <p className="text-sm text-muted-foreground">
          Skill distribution and registration count
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                label
              >
                {skillData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress bars */}
        <div className="flex flex-col gap-4">
             {skillData.map((skill, index) => {
            const percent = (skill.value / total) * 100;
            return (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.value}
                  </span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprenticeActvityChart;
