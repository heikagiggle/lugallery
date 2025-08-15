"use client";
import { useRouter } from "next/navigation";
import { AdminButton } from "../../../components/widgets/buttons/AdminButton";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import { UserTable } from "./components/user-table";

const AllUsers = () => {
  const router = useRouter();

  return (
    <div className="pr-[2rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar
        rightContent={
          <AdminButton
            onClick={() => router.push("/admin/dashboard/users/add-user")}
          >
            Add User
          </AdminButton>
        }
      />
      <UserTable />
    </div>
  );
};

export default AllUsers;
