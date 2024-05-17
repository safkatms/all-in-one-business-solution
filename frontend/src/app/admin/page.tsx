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
      <InsideHeader />

      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <h1 className="text-3xl text-center mt-8">ADMIN PANEL</h1>
              <OwnerListTable />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
