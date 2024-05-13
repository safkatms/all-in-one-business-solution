import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute requiredRole={["admin", "owner"]}>
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div>
          <h1>Welcome to Dashboard</h1>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
