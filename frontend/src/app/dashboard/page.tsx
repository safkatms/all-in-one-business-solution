import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div>
          <h1>Welcome to Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
