"use client";

import { Suspense } from "react";
import DashboardTopbar from "../../../../components/widgets/topbar/dashboard-topbar";
import { ReviewsTable } from "./components/reviews-table";

const UserReviews = () => {
  return (
    <div className="pr-[0.5rem] sm:pr-[1.5rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar />
      <Suspense fallback={<div>Loading reviews...</div>}>
        <ReviewsTable />
      </Suspense>
    </div>
  );
};

export default UserReviews;
