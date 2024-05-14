import React from "react";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import PurchaseDetailsTable from "@/components/Purchasetable";

const PurchaseDashboard: React.FC = () => {
  return (
    <div>
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <h1 className="text-2xl text-center mt-8 mb-3">
            Purchase Management Dashboard
          </h1>
          <Link href="PurchaseManagement/AddPurchase">
            <h3 className="block text-center bg-customTeal hover:bg-buttonHover text-white mb-3 py-2 px-4 border rounded-md transition duration-300 ease-in-out">
              Add Purchase
            </h3>
          </Link>
          <PurchaseDetailsTable />
        </div>
      </div>
    </div>
  );
};

export default PurchaseDashboard;
