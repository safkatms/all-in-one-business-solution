"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";
import CustomerListTable from '@/components/customerlisttable';
import CustomerSearch from '@/components/customersearch';


export default function Customer()  {
  const router = useRouter();
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");

  const handleChangename = (e: ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };
  const handleChangecontact = (e: ChangeEvent<HTMLInputElement>) => {
    setcontact(e.target.value);
  };
  const handleChangeemail = (e: ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };
 
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      name,
      contact,
      email,
      
    });

    setError("");
    if (
      !name ||
      !contact ||
      !email
      
    ) {
      setError("All fields are required");
      return;
    }
     
    if (!name.match(/^[A-Z][a-z]*$/)) {
      setError(
        "Customer name must start with a capital letter and contain no numbers or special characters."
      );
      return;
    }
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Invalid email address.");
      return;
    }
    
    if (!contact.match(/^01[3-9]\d{8}$/)) {
      setError("Mobile number must be a valid Bangladesh number.");
      return;
    }
    
    try {
      const response = await postData();
      console.log("Customer created successfully:", response);
      setError("Customer created successfully");
      
      setname("");
      setcontact("");
      setemail("");
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Customer Already Exist");
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const data1 = {
        name: name,
        contact: contact,
        email: email,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/customer/create`,
        data1,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      throw new Error("Error creating customer");
    }
  }









  return (

<ProtectedRoute requiredRole={["owner","salesman"]}>
      <InsideHeader />
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Sidebar />
        <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
          <h1 className="text-4xl font-extrabold flex justify-center p-8">
           Customer Registration
          </h1>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="p-8 flex justify-center">
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Name</label>
                    </td>
                   
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChangename}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                   
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label>Contact</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        name="contact"
                        value={contact}
                        onChange={handleChangecontact}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Email</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChangeemail}
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
                        Register
                      </button>
                    </td>
                    <td>
                      <button
                        type="reset"
                        className="bg-red-600 text-white rounded-lg font-semibold w-mid mt-2 py-2 px-3"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          
        </div>
        <div className="bg-white my-10  mx-2 m-10 w-100% border ">

          <CustomerListTable/>
          </div>
        </div>
        
        </div>
      </div>
    </ProtectedRoute>
    
  );
};

