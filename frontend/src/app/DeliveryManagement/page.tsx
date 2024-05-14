"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import axios from "axios";
import Cookies from "js-cookie";
import ProtectedRoute from "@/utils/protectedRoute";
import DeliveryManTable from "@/components/deliveryManTable";
import InventoryProductTable from "@/components/Inventorytable";

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
  const [order, setOrder] = useState<OrderDelivery | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = Cookies.get("jwtToken");
        const response = await axios.get<OrderDelivery>(
          `http://localhost:3000/delivery/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        setError("Data Not Found !");
      } finally {
        setLoading(false);
      }
    };

    if (orderId !== "") {
      fetchOrderDetails();
    } else {
      setOrder(null);
    }
  }, [orderId]);

  const router = useRouter();
  //navigate make delivery Product page
  const handleMakeDelivery = (orderId: number) => {
    router.push(`/DeliveryManagement/MakeDelivery/${orderId}`);
  };
  //returned page
  const handleReturnedDelivery = (orderId: number) => {
    router.push(`/DeliveryManagement/ReturnedDelivery/${orderId}`);
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
            </div>
          </div>

          <h1 className="text-2xl text-center mt-8 mb-4">
            Delivery Management Dashboard
          </h1>
          <div className="flex justify-center mt-8">
            <div className="w-100%">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-600">{error}</p>}
              {order && (
                <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Sold By</th>
                      <th className="px-4 py-2">Customer ID</th>
                      <th className="px-4 py-2">Customer Contact</th>
                      <th className="px-4 py-2">Total Price</th>
                      <th className="px-4 py-2">Order Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr key={order.orderId}>
                      <td className="px-4 py-2">{order.orderId}</td>
                      <td className="px-4 py-2">{order.soldBy}</td>
                      <td className="px-4 py-2">{order.customerId}</td>
                      <td className="px-4 py-2">{order.customerContact}</td>
                      <td className="px-4 py-2">{order.totalPrice}</td>
                      <td className="px-4 py-2">{order.orderStatus}</td>
                      <td className="px-4 py-2">
                        <button
                          type="submit"
                          className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                          onClick={() => handleMakeDelivery(order.orderId)}
                        >
                          Completed
                        </button>
                        <button
                          type="submit"
                          className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                          onClick={() => handleReturnedDelivery(order.orderId)}
                        >
                          returned
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <DeliveryManTable />
          <InventoryProductTable />
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default DeliveryDashboard;
