import UserTable from "@/Components/UserTable/UserTable";
import React from "react";

const Users = () => {
  return (
    <div className="p-2 md:p-8 min-h-screen bg-gray-50/30">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage buyer, seller, and admin accounts</p>
      </div>
      <div className="z-50">
        <UserTable />
      </div>
    </div>
  );
};

export default Users;
