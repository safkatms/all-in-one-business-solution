"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import ConfirmationModal from "./ConfirmationModal";
import ProtectedRoute from "@/utils/protectedRoute";

interface Customer {
  name: string;
  contact: string;
  email: string;
  
}


export default function CustomerListTable() {
   
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [error, setError] = useState("");
  const [contact, setcontact] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleChangecontact = (contact: any) => {
    setcontact(contact);
  };

    useEffect(() => {
      const fetchCustomer = async () => {
        try {
          const token = getToken();
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/customer`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCustomer(response.data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };
      fetchCustomer();
    }, []);

    const router = useRouter();
    
    const handleUpdate = (contact: string) => {
      router.push(`/customer/update/${contact}`);
    };



  async function postData() {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/customer/update/contact${contact}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProtectedRoute requiredRole={["owner","hr"]}>
    
      <div className="flex justify-center mt-8">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> All Customer:</h1>
            <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {customer.map((customer) => (
                  <tr key={customer.contact}>
                    <td className="px-4 py-2">{customer.name}</td>
                    <td className="px-4 py-2">{customer.contact}</td>
                    <td className="px-4 py-2">{customer.email}</td>
                    
                    <td className="px-4 py-2">
                      <button
                        type="submit"
                        className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        value={customer.contact}
                        onClick={() =>
                          handleUpdate(customer.contact)
                        }
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
