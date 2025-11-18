"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { AdminButton } from "../../../components/widgets/buttons/AdminButton";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import { ApprenticeTable } from "./components/apprentice-table";

const Apprentices = () => {
  const router = useRouter();

  return (
    <div className="pr-[0.5rem] sm:pr-[1.5rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar
        rightContent={
          <AdminButton
            onClick={() =>
              router.push("/admin/dashboard/apprentices/add-apprentice")
            }
          >
            Add Apprentice
          </AdminButton>
        }
      />
      <Suspense fallback={<div>Loading users...</div>}>
        <ApprenticeTable />
      </Suspense>
    </div>
  );
};

export default Apprentices;
