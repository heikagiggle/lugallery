import Link from "next/link";
import { AdminButton } from "../../../../../components/widgets/buttons/AdminButton";
import { Card } from "@/components/ui/card";

const Partners = () => {
  return (
    <Card className="p-4 flex justify-center items-center gap-3">
      <h2 className="text-2xl font-semibold">Partner Management</h2>
      <p>Manage and review partner accounts</p>
      <Link href={"/admin/dashboard/partners?page=0"}>
        {" "}
        <AdminButton>View All Partners</AdminButton>
      </Link>
    </Card>
  );
};

export default Partners;
