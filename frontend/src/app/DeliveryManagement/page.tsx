"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import DeliveryManagementTable from "@/components/deliveryManTable";
import axios from "axios";
import DeliveryManagementSearchTable from "@/components/deliveryManSearchTable";
import Cookies from "js-cookie";
import ProtectedRoute from "@/utils/protectedRoute";

interface OrderDelivery {
  orderId: number;
  soldBy: string;
  customerId: number;
  customerContact: string;
  totalPrice: number;
  orderStatus: string;
}

const DeliveryDashboard: React.FC = () => {

  const [orderId, setOrderId] = useState("");
  const [deliveryData, setDeliveryData] = useState<OrderDelivery[]>([]);

  const handleSearch = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.get(
        `http://localhost:3000/delivery/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data)) {
        setDeliveryData(response.data);
      } else {
        setDeliveryData([]); // Set to empty array if response.data is not an array
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
      // setDeliveryData([]); // Set to empty array
    }
    
  };
  

  return (
    <ProtectedRoute requiredRole={"owner"}>
      <InsideHeader />

      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="flex justify-end mt-3">
            <div className="flex items-center w-3/10">
              <input
                type="text"
                placeholder="Search..."
                className="appearance-none border rounded-xl w-full py-2 px-3 mr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <button
                type="button"
                className="bg-customTeal hover:bg-buttonHover border rounded-xl text-white font-bold text-sm py-2 px-3 mr-2  focus:outline-none focus:shadow-outline"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <h1 className="text-2xl text-center mt-8 mb-3">
            Delivery Management Dashboard
          </h1>
          <DeliveryManagementSearchTable data={deliveryData} />

          <DeliveryManagementTable />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DeliveryDashboard;
