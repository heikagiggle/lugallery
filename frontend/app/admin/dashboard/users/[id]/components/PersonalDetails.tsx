import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { UserProps } from "../../components/data";
import { formatDate } from "../../../components/helper";

interface Props {
  user: UserProps;
}

const PersonalDetails = ({ user }: Props) => {
  return (
    <Card className="p-6 border border-green-200 mt-6">
      <h1 className="font-bold text-xl">Personal Details</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-between font-medium">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {user.image ? (
            <Image
              src={user.image || "/default-avatar.png"}
              width={300}
              height={400}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full object-cover bg-gray-200">
              <p>No image </p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">
              Joined {formatDate(user.date_registered)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-gray-500">Gender: {user.name}</h2>
            <p className="text-gray-500">Address: {user.email}</p>
            <p className=" text-gray-500">
              State: {formatDate(user.date_registered)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalDetails;
