"use client";
import PersonalInfoCard from "./components/PersonalInfoCard";
import { artisansWithStudents } from "../components/data";
import { useParams } from "next/navigation";
import { StudentsTable } from "./components/StudentsTable";
import { Card } from "@/components/ui/card";
import DashboardTopbar from "../../../../../components/widgets/topbar/dashboard-topbar";

const TrainingDetails = () => {
  const { id } = useParams();

  const artisan = artisansWithStudents.find((a) => a.id === id);

  if (!artisan) {
    return (
      <div className="p-8 text-center text-gray-500">
        No artisan found with ID: {id}
      </div>
    );
  }

  return (
    <div>
      <DashboardTopbar />
      <PersonalInfoCard artisan={artisan} />

      <Card className="mt-6 shadow-md rounded-xl w-full py-2 gap-1">
        {" "}
        <h3 className="text-lg font-semibold text-primary-foreground p-5">
          Students Learning from {artisan.name}
        </h3>
        <StudentsTable students={artisan.students} />
      </Card>
    </div>
  );
};

export default TrainingDetails;
