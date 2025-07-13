import React from "react";
import { CardStats } from "./components/dashboard-components/admin-card-stats/CardStats";
import { Card } from "@/components/ui/card";
import UsersAndPartners from "./components/dashboard-components/users-and-partners";
import Insights from "./components/dashboard-components/insights";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-lg p-4 gap-2 space--1">
        <h1 className="font-semibold text-lg">Welcome Admin</h1>
        <p>See what&apos;s new</p>
      </Card>
      <CardStats />
      <Insights />
      <UsersAndPartners />
    </div>
  );
};

export default Dashboard;
