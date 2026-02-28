import { Card } from "@/components/ui/card";
import { AdminButton } from "../../../../../components/widgets/buttons/AdminButton";
import Link from "next/link";

const Users = () => {
  return (
    <Card className="p-4 flex justify-center items-center gap-3">
      <h2 className="text-2xl font-semibold">User Management</h2>
      <p>Manage and review user accounts</p>

      <Link href={"/admin/dashboard/users?page=0"}>
        {" "}
        <AdminButton>View All Users</AdminButton>
      </Link>
    </Card>
  );
};

export default Users;
