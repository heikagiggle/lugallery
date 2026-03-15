"use client";
import AnalyticsCard from "./components/card/analytics-card";
import UserActivityChart from "./components/charts/user-activity-chart";
import ApprenticeActvityChart from "./components/charts/apprentice-actvity";

const AnalyticsPage: React.FC = () => {
  return (
    <div className="minh-screen bg-gray50 p8">
      <h1 className="text-xl font-bold text-foreground mb-6">
        📊 Lugallery Analytics
      </h1>

      {/* --- Summary Cards Section --- */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Users"
          value="2,450"
          change="+12.5% from last week"
          isPositive={true}
        />
        <AnalyticsCard
          title="New Sign-ups"
          value="340"
          change="+1.1% from last week"
          isPositive={true}
        />
        <AnalyticsCard
          title="Engagement"
          value="3,756"
          change="-0.5% from last week"
          isPositive={false}
        />
        <AnalyticsCard
          title="Retention"
          value="20%"
          change="+5.2% from last week"
          isPositive={true}
        />
      </div>

      <div className="mt-8">
        <UserActivityChart />
      </div>

      <div className="mt-8">
        <ApprenticeActvityChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;
