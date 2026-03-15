import React from "react";
import Partners from "./Apprentices";
import Users from "./Clients";

const UsersAndPartners = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-4 gap-4 overflow-hidden">
      <div className="flex-1 min-w-0 max-w-full"> <Users /> </div>

      <div className="flex-1 min-w-0 max-w-full">
        <Partners />
      </div>
    </div>
  );
};

export default UsersAndPartners;
