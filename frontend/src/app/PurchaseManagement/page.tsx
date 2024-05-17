import React from "react";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import PurchaseDetailsTable from "@/components/Purchasetable";
import ProtectedRoute from "@/utils/protectedRoute";

const PurchaseDashboard: React.FC = () => {
  return (
    <ProtectedRoute requiredRole={["owner", "salesman"]}>
      <InsideHeader />
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <h1 className="text-2xl text-center mt-8 mb-3">
                Purchase Management Dashboard
              </h1>
              <Link href="PurchaseManagement/AddPurchase">
                <h3 className="block text-center bg-customTeal hover:bg-buttonHover text-white mb-3 py-2 px-4 border rounded-md transition duration-300 ease-in-out">
                  Add Purchase
                </h3>
              </Link>
              
            </div>
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
                <PurchaseDetailsTable />
              </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PurchaseDashboard;
