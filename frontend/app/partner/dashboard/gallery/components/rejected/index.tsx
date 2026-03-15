import { Suspense } from "react";
import { RejectedProfileTable } from "./components/rejected-table";

const Rejected = () => {
  return (
    <Suspense>
      <RejectedProfileTable />
    </Suspense>
  );
};

export default Rejected;
