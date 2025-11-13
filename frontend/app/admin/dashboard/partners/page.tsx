"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { AdminButton } from "../../../components/widgets/buttons/AdminButton";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import { PartnerTable } from "./components/partner-table";

const AllPartners = () => {
  const router = useRouter();

  return (
    <div className="pr-[2rem] md:pr-[3rem] lg:pr-0">
      <DashboardTopbar
        rightContent={
          <AdminButton
            onClick={() => router.push("/admin/dashboard/partners/add-artisan")}
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
