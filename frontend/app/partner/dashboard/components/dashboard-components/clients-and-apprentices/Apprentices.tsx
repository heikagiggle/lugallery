import Link from "next/link";
import { AdminButton } from "../../../../../components/widgets/buttons/AdminButton";
import { Card } from "@/components/ui/card";

const Apprentices = () => {
  return (
    <Card className="p-4 flex justify-center items-center gap-3">
      <h2 className="text-2xl font-semibold">Apprentice Management</h2>
      <p>Manage and review apprentice accounts</p>
      <Link href={"/admin/dashboard/partners?page=0"}>
        {" "}
        <AdminButton>View All Apprentices</AdminButton>
      </Link>
    </Card>
  );
};

export default Apprentices;
