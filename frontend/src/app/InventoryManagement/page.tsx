import React from "react";
import InventoryProductTable from "@/components/Inventorytable";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

const InventoryDashboard: React.FC = () => {
  return (
    <div>
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <h1 className="text-2xl text-center mt-8 mb-3">
            Inventory Dashboard
          </h1>
          <Link href="InventoryManagement/AddProduct">
            <h3 className="block text-center bg-customTeal hover:bg-buttonHover text-white mb-3 py-2 px-4 border rounded-md transition duration-300 ease-in-out">
              Add Product
            </h3>
          </Link>
          <InventoryProductTable />
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
