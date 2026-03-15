"use client";
import { Suspense } from "react";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import { ProfileTabs } from "./components/profile-tabs";

const Gallery = () => {
  return (
    <div className="pr-[0.5rem] sm:pr-[1.5rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar />
      <Suspense>
        {" "}
        <ProfileTabs />
      </Suspense>
    </div>
  );
};

export default Gallery;
