import { Suspense } from "react";
import { AcceptedApprenticeTable } from "./accepted-apprentice-table";

const Accepted = () => {
  return (
    <Suspense fallback={<div>Loading apprentices...</div>}>
      <AcceptedApprenticeTable />
    </Suspense>
  );
};

export default Accepted;
