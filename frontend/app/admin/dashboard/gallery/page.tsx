"use client";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import { ProfileTabs } from "./components/profile-tabs";

const Gallery = () => {
  return (
    <div className="pr-[2rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar />
      <ProfileTabs />
    </div>
  );
};

export default Gallery;
