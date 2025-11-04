"use client";

import { Suspense } from "react";
import DashboardTopbar from "../../../../components/widgets/topbar/dashboard-topbar";
import { FeedbackTable } from "./components/feedback-table";

const UserFeedback = () => {
  return (
    <div className="pr-[2rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar />
      <Suspense fallback={<div>Loading feedbacks...</div>}>
        <FeedbackTable />
      </Suspense>
    </div>
  );
};

export default UserFeedback;
