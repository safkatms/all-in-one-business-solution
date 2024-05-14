"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface OrderDelivery {
  orderId: number;
  soldBy: string;
  customerId: number;
  customerContact: string;
  totalPrice: number;
  orderStatus: string;
}

export default function DeliveryManagementTable() {
  const [orderDelivery, setOrderDelivery] = useState<OrderDelivery[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await axios.get("http://localhost:3000/delivery/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDelivery(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchProducts();
  }, []);

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
    <>
      <div className="flex justify-center mt-8">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> All Products:</h1>
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
              {orderDelivery.map((order) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
