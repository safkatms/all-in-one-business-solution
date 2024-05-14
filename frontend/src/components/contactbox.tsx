"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";


export default function Order()  {
  const router = useRouter();
  const [customerContact, setcustomerContact] = useState("");
  const [orderId, setorderId] = useState("");
  const [error, setError] = useState("");

  const handleChangecustomerContact = (e: ChangeEvent<HTMLInputElement>) => {
    setcustomerContact(e.target.value);
  };
 
 
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
    
        customerContact,
     
      
    });

    setError("");
    if (
       !customerContact
      
    ) {
      setError("Customer Contact required");
      return;
    }
     
    if (!customerContact.match(/^01[3-9]\d{8}$/)) {
      setError("Mobile number must be a valid Bangladesh number.");
      return;
    }
    
    try {
      const response = await postData();
      console.log("Order created successfully:", response);
      setError("Order created successfully");
      
      setcustomerContact("");
     
    } catch (error) {
      console.error("Error creating Order:", error);
      setError("Customer not found or Error ");
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const data1 = {
        customerContact: customerContact,
        
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/order`,
        data1,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setorderId(data.order.orderId);
      console.log(data);
    } catch (error) {
      throw new Error("Error creating Order");
    }
  }









  return (

<ProtectedRoute requiredRole={["owner"]}>
      
      <div className="flex">
        <div className=" my-10 w-screen ">
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {orderId && <p className="text-green-500 text-center mt-2">Use {orderId} as Order ID</p>}
          <div className=" flex justify-center">
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>

                  <tr>
                    <td colSpan={2}>
                      <label>Contact</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        name="customerContact"
                        value={customerContact}
                        onChange={handleChangecustomerContact}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr> 
                  <tr className="text-center">
                    <td>
                      <button
                        type="submit"
                        className="bg-customTeal text-white rounded-lg font-semibold w-mid mt-2 py-2 px-3"
                      >
                        Create Order
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
    
  );
};

