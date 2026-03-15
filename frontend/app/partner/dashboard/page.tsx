"use client";
import { CardStats } from "./components/dashboard-components/admin-card-stats/CardStats";
import { Card } from "@/components/ui/card";
import UsersAndPartners from "./components/dashboard-components/clients-and-apprentices";
import Insights from "./components/dashboard-components/insights";
import { useAllProfile } from "@/app/hooks/auth";

const Dashboard = () => {
  const { data } = useAllProfile();
  return (
    <div className="space-y-6">
      <Card className="bg-background rounded-lg p-4 gap-2 border-gray-600">
        <h1 className="font-semibold text-lg">
          Welcome <span className="text-brand italic">{data?.partner?.name ?? "Partner"}</span>
        </h1>
        <p>See what&apos;s new</p>
      </Card>
      <CardStats />
      <Insights />
      <UsersAndPartners />
    </div>
  );
};

export default Dashboard;
