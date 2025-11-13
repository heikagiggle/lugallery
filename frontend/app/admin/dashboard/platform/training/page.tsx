import { Suspense } from "react";
import DashboardTopbar from "../../../../components/widgets/topbar/dashboard-topbar";
import { TrainingTable } from "./components/training-table";

const Programs = () => {
  return (
    <>
      {" "}
      <DashboardTopbar />
      <Suspense>
        <TrainingTable />
      </Suspense>
    </>
  );
};

export default Programs;
