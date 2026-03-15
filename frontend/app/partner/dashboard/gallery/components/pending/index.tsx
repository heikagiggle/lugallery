import { Suspense } from "react";
import { PendingProfileTable } from "./components/pending-table";

const Pending = () => {
  return (
    <Suspense>
      <PendingProfileTable />
    </Suspense>
  );
};

export default Pending;
