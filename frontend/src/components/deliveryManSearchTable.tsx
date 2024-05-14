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

interface DeliveryManagementTableProps {
  data: OrderDelivery[];
}

const DeliveryManagementSearchTable: React.FC<DeliveryManagementTableProps> = ({
  data,
}) => {
  const router = useRouter();
  const handleMakeDelivery = (orderId: number) => {
    router.push(`/DeliveryManagement/MakeDelivery/${orderId}`);
  };

  const handleReturnedDelivery = (orderId: number) => {
    router.push(`/DeliveryManagement/ReturnedDelivery/${orderId}`);
  };

  console.log(data);

  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> All Orders:</h1>
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
              {data.map((order) => (
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
};

export default DeliveryManagementSearchTable;
