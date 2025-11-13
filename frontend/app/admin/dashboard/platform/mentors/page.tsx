import React, { Suspense } from "react";
import { MentorTable } from "./components/mentors-table";
import DashboardTopbar from "../../../../components/widgets/topbar/dashboard-topbar";

const Mentors = () => {
  return (
    <div>
      <DashboardTopbar />
      <Suspense>
        <MentorTable />
      </Suspense>
    </div>
  );
};

export default Mentors;
