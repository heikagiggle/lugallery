import { Suspense } from "react";
import { PendingApprenticeTable } from "./pending-apprentice-table";

const Pending = () => {
  return (
    <Suspense fallback={<div>Loading apprentices...</div>}>
      <PendingApprenticeTable />
    </Suspense>
  );
};

export default Pending;
