"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { AdminButton } from "../../../components/widgets/buttons/AdminButton";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import { PartnerTable } from "./omponents/partner-table";

const AllPartners = () => {
  const router = useRouter();

  return (
    <div className="pr-[2rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar
        rightContent={
          <AdminButton
            onClick={() => router.push("/admin/dashboard/users/add-user")}
          >
            Add Partner
          </AdminButton>
        }
      />
      <Suspense fallback={<div>Loading partners...</div>}>
        <PartnerTable />
      </Suspense>
    </div>
  );
};

export default AllPartners;
