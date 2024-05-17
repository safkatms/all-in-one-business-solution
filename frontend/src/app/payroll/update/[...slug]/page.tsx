"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";

export default function PayrollUpdate({
  params,
}: {
  params: { slug: [string, string] };
}) {
  const [employeeId, setEmployeeId] = useState(params.slug[0]);
  const [bonus, setBonus] = useState("");
  const [payrollMonth, setPayrollMonth] = useState(params.slug[1]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const route = useRouter();

  const handleChangeBonus = (e: ChangeEvent<HTMLInputElement>) => {
    setBonus(e.target.value);
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      bonus,
      status,
    });
    setError("");
    if (!status) {
      setError("Fill the require field");
      return;
    }
    try {
      const response = await postData();
      console.log("payroll Update successfully:", response);
      setError("Payroll Update successfully");

      route.push("/payroll");
    } catch (error) {
      console.error("Error creating payroll:", error);
      setError(`Payroll Creating error`);
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const data1 = {
        bonus: parseInt(bonus),
        status: status,
      };
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/payroll/update/${employeeId}/${payrollMonth}`,
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
    <ProtectedRoute requiredRole={["owner", "hr"]}>
      <InsideHeader />
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <h1 className="text-4xl font-extrabold flex justify-center p-8">
                Payroll Update
              </h1>
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
              <div className="p-8 flex justify-center">
                <form onSubmit={handleSubmit}>
                  <table>
                    <tbody>
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
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
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
                            Cancel
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
