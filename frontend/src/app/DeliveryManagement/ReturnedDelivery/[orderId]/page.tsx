"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import DeliveryManagementTable from "@/components/deliveryManTable";
import InsideHeader from "@/components/insideheader";
import ProtectedRoute from "@/utils/protectedRoute";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import SuccessMessage from "@/components/successMessage";
import { useRouter } from "next/navigation";

interface OrderDelivery {
  orderId: number;
  soldBy: string;
  customerId: number;
  customerContact: string;
  totalPrice: number;
  status: string;
}

export default function ReturnedDelivery({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  // State variables
  const [order, setOrder] = useState<OrderDelivery>({
    orderId: 0,
    soldBy: "",
    customerId: 0,
    customerContact: "",
    totalPrice: 0,
    status: "",
  });
  const [status, setOrderStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const closeSuccessMessage = () => {
    setSuccessMessage("");
    router.push("/DeliveryManagement");
  };
  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
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
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle change in order status
  const handleChangeOrderStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await postData();
      setSuccessMessage("Order Returned !");
      Cookies.set("successMessage", `${orderId} has been returned !`);
    } catch (error) {
      console.error("Error making delivery:", error);
    }
  };

  // Post data to update order status
  const postData = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const data1 = {
        status: status,
      };
      console.log(data1);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/delivery/returned-delivery/${orderId}`,
        data1,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <ProtectedRoute requiredRole={"owner"}>
      <InsideHeader />
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <div className="flex justify-end mt-3">{/* Search input */}</div>

              <div className="flex justify-center mt-3">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md bg-white p-6"
                >
                  <h1 className="text-2xl font-bold text-center mt-1 mb-2">
                    Return Delivery
                  </h1>
                  <div className="mb-3">
                    <label
                      htmlFor="orderId"
                      className="block text-gray-700 font-bold mb-1 text-sm"
                    >
                      Order ID
                    </label>
                    <input
                      type="text"
                      name="orderId"
                      value={order.orderId}
                      readOnly
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="soldBy"
                      className="block text-gray-700 font-bold mb-1 text-sm"
                    >
                      Sold By
                    </label>
                    <input
                      type="text"
                      name="soldBy"
                      value={order.soldBy}
                      readOnly
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="contactNumber"
                      className="block text-gray-700 font-bold mb-1 text-sm"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={order.customerContact}
                      readOnly
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="totalPrice"
                      className="block text-gray-700 font-bold mb-1 text-sm"
                    >
                      Total Price
                    </label>
                    <input
                      type="text"
                      name="totalPrice"
                      value={order.totalPrice}
                      readOnly
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="status"
                      className="block text-gray-700 font-bold mb-1 text-sm"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      value={status}
                      onChange={handleChangeOrderStatus}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="completed">Completed</option>
                      <option value="returned">Returned</option>
                    </select>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-customTeal hover:bg-buttonHover text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                    >
                      Proceed
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <DeliveryManagementTable />
            </div>
          </div>
        </div>
      </div>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={closeSuccessMessage}
        />
      )}
      {/* <DeliveryManagementTable /> */}
    </ProtectedRoute>
  );
}
