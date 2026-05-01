import { Suspense } from "react";
import { RejectedApprenticeTable } from "./rejected-apprentice-table";

const Rejected = () => {
  return (
    <Suspense fallback={<div>Loading apprentices...</div>}>
      <RejectedApprenticeTable />
    </Suspense>
  );
};

export default Rejected;
