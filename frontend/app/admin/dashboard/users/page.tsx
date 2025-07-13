import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import React from "react";
import { UserTable } from "./components/program-table";

const AllUsers = () => {
  return (
    <div>
      <DashboardTopbar />
      All users
      <UserTable />
    </div>
  );
};

export default AllUsers;
