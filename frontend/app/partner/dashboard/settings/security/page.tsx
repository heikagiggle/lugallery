import React from "react";
import SecurityForm from "./SecurityForm";
import DashboardTopbar from "@/app/components/widgets/topbar/dashboard-topbar";

const Security = () => {
  return (
    <div>
      <DashboardTopbar />
      <SecurityForm />
    </div>
  );
};

export default Security;
