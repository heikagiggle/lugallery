import React, { Suspense } from "react";
import { ApprovedProfileTable } from "./components/approved-table";

const Approved = () => {
  return (
    <Suspense>
      <ApprovedProfileTable />
    </Suspense>
  );
};

export default Approved;
