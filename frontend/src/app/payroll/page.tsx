"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";
import EmployeeTable from "@/components/employeeTable";
import { stat } from "fs";

export default function Employee() {
  const router = useRouter();
  const [employeeId, setemployeeId] = useState("");
  const [bonus, setbonus] = useState("");
  const [payrollMonth, setpayrollMonth] = useState("");
  const [status, setstatus] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmployeeId = (e: ChangeEvent<HTMLInputElement>) => {
    setemployeeId(e.target.value);
  };
  const handleChangeBonus = (e: ChangeEvent<HTMLInputElement>) => {
    setbonus(e.target.value);
  };
  const handleChangePayrollMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setpayrollMonth(e.target.value);
  };
  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setstatus(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      employeeId,
      bonus,
      payrollMonth,
      status
    });
    setError("");
    if (
      !employeeId ||
      !payrollMonth ||
      !status 
    ) {
      setError("Fill the require field");
      return;
    }


    try {
      const response = await postData();
      console.log("payroll created successfully:", response);
      setError("Payroll created successfully");
      // Reset form fields
      setemployeeId("");
      setbonus("");
      setpayrollMonth("");
      setbonus("");
    } catch (error) {
      console.error("Error creating payroll:", error);
      setError(`Payroll for employee ID ${employeeId} and month ${payrollMonth} already exists`);
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const data1 = {
        employeeId: parseInt(employeeId),
        bonus: parseInt(bonus),
        payrollMonth: payrollMonth,
        status: status,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/payroll/create`,
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
      throw new Error("Error creating payroll");
    }
  }

  return (
    <ProtectedRoute requiredRole={["owner","hr"]}>
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div>
          <div className="bg-white my-10 w-screen h-fit shadow-2xl rounded-xl">
            <h1 className="text-4xl font-extrabold flex justify-center p-8">
              Payroll
            </h1>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="p-8 flex justify-center">
              <form onSubmit={handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <label className="text-lg">Employee ID</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="number"
                          name="employeeId"
                          value={employeeId}
                          onChange={handleChangeEmployeeId}
                          className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    </tr>
                  
                    <tr>
                      <td colSpan={2}>
                        <label className="text-lg">Bonus</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="number"
                          name="bonus"
                          value={bonus}
                          onChange={handleChangeBonus}
                          className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label className="text-lg">Joining Date</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="month"
                          name="payrollMonth"
                          value={payrollMonth}
                          onChange={handleChangePayrollMonth}
                          className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label className="text-lg">Status</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <select
                          name="status"
                          value={status}
                          onChange={handleChangeStatus}
                          className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option id="" value="">
                            Select an option
                          </option>
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                        </select>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <button
                          type="submit"
                          className="bg-customTeal text-white rounded-lg font-semibold w-m mt-2 py-2 px-6"
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          type="reset"
                          className="bg-red-600 text-white rounded-lg font-semibold w-m mt-2 py-2 px-3"
                        >
                          Cancle
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
          <div className="bg-white my-10 w-screen h-fit shadow-2xl rounded-xl">
            <EmployeeTable />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
