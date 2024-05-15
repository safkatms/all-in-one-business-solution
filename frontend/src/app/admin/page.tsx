"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";

import OwnerListTable from "@/components/ownerlisttable";

const AdminPage = () => {
  return (
    <ProtectedRoute requiredRole={["admin"]}>
      <>
        <InsideHeader />
        <div>
          <h1 className="text-3xl text-center mt-8">ADMIN PANEL</h1>
        </div>
        <div className="flex justify-center mt-3">
        <OwnerListTable/>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default AdminPage;
