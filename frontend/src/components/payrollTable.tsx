"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import ConfirmationModal from "./ConfirmationModal";
import ProtectedRoute from "@/utils/protectedRoute";

interface Payroll {
    payrollId: number;
    salary: string;
    bonus: string;
    payrollMonth: string;
    status: string;
    employee: {
        employeeid: number;
    }
  
}


export default function PayrollTable() {
   
  const [payroll, setPayroll] = useState<Payroll[]>([]);
  

    useEffect(() => {
      const fetchpayroll = async () => {
        try {
          const token = getToken();
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/payroll/records`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPayroll(response.data);
        } catch (error) {
          console.error("Error fetching payroll:", error);
        }
      };
      fetchpayroll();
    }, []);

    const router = useRouter();
    
    const handleUpdate = (employeeid:number,payrollMonth:string) => {
      router.push(`/payroll/update/${employeeid}/${payrollMonth}`);
    };


  return (
    <ProtectedRoute requiredRole={["owner","hr"]}>
    
      <div className="flex justify-center mt-8">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> Payroll Records:</h1>
            <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">Salary</th>
                  <th className="px-4 py-2">Bonus</th>
                  <th className="px-4 py-2">Payroll Month</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {payroll.map((payroll) => (
                  <tr key={payroll.payrollId}>
                    <td className="px-4 py-2">{payroll.employee.employeeid}</td>
                    <td className="px-4 py-2">{payroll.salary}</td>
                    <td className="px-4 py-2">{payroll.bonus}</td>
                    <td className="px-4 py-2">{payroll.payrollMonth}</td>
                    <td className="px-4 py-2">{payroll.status}</td>
                    
                    <td className="px-4 py-2">
                      <button
                        type="submit"
                        className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        value={payroll.employee.employeeid}
                        onClick={() =>
                          handleUpdate(payroll.employee.employeeid,payroll.payrollMonth)
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
