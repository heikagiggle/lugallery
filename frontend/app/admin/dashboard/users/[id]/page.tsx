"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";
import PersonalDetails from "./components/PersonalDetails";
import EngagementTable from "./components/EngagementTable";
import { users } from "../components/data";
import DashboardTopbar from "../../../../components/widgets/topbar/dashboard-topbar";

const UserDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return (
      <Card className="p-6 mt-6">
        <p className="text-gray-500">No user id provided.</p>
      </Card>
    );
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <Card className="p-6 mt-6">
        <p className="text-gray-500">User not found.</p>
      </Card>
    );
  }

  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <DashboardTopbar />
      <PersonalDetails user={user} />
      <EngagementTable />
      <Card className="p-6 gap-1 bg-red-50 border border-red-200 mt-6">
        <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
        <p className="text-sm text-red-500 mb-3">
          Deleting this user will permanently remove their data.
        </p>
        <Button variant="destructive" className="w-fit">
          Delete User
        </Button>
      </Card>
    </Suspense>
  );
};

export default UserDetails;
