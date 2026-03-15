import { Card } from "@/components/ui/card";
import { AdminButton } from "../../../../../components/widgets/buttons/AdminButton";
import Link from "next/link";

const Clients = () => {
  return (
    <Card className="p-4 flex justify-center items-center gap-3">
      <h2 className="text-2xl font-semibold">Clients Management</h2>
      <p>Manage and review clients accounts</p>

      <Link href={"/admin/dashboard/users?page=0"}>
        {" "}
        <AdminButton>View All Clients</AdminButton>
      </Link>
    </Card>
  );
};

export default Clients;
