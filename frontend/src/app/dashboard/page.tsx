"use client";
import React, { useEffect, useState } from "react";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import Image from "next/image";
import Link from "next/link";
import { getCompany } from "@/utils/auth";

const Dashboard = () => {
  const [company, setCompany] = useState<string | null | undefined>(null);

  useEffect(() => {
    setCompany(getCompany());
  }, []);

  return (
    <ProtectedRoute
      requiredRole={[
        "admin",
        "owner",
        "hr",
        "accountant",
        "inventory_manager",
        "salesman",
      ]}
    >
      <InsideHeader />
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10 p-8 mx-2 m-10 w-100% border ">
              {company !== null && company !== undefined ? (
                <h1 className="text-3xl font-bold mt-4 mb-4">
                  Welcome to {company}
                </h1>
              ) : (
                <h1 className="text-3xl font-bold mt-4 mb-4">Loading...</h1>
              )}
              <p className="text-gray-600 mb-8">
                Your one-stop solution for all business needs!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
                <div>
                  <Link href="/employee">
                    <Image
                      src="/hr.png"
                      alt="AIOBS Logo"
                      width={400}
                      height={50}
                      className="rounded shadow-2xl ring-offset-2 ring-2 ring-fuchsia-400"
                    ></Image>
                  </Link>
                </div>
                <div>
                  <Link href="/accounts">
                    <Image
                      src="/account.png"
                      alt="AIOBS Logo"
                      width={400}
                      height={50}
                      className="rounded shadow-2xl ring-offset-2 ring-2 ring-teal-600"
                    ></Image>
                  </Link>
                </div>
                <div>
                  <Link href="/InventoryManagement">
                    <Image
                      src="/inventory.png"
                      alt="AIOBS Logo"
                      width={400}
                      height={50}
                      className="rounded shadow-2xl ring-offset-2 ring-2 ring-teal-300"
                    ></Image>
                  </Link>
                </div>
                <div>
                  <Link href="/order">
                    <Image
                      src="/sales.png"
                      alt="AIOBS Logo"
                      width={400}
                      height={50}
                      className="rounded shadow-2xl ring-offset-2 ring-2 ring-fuchsia-800"
                    ></Image>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
