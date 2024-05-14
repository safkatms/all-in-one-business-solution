"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import ConfirmationModal from "./ConfirmationModal";
import ProtectedRoute from "@/utils/protectedRoute";
interface Employee {
  employeeid: number;
  userid: number;
  employeesalary: number;
  employeejoiningdate: string;
}

export default function EmployeeTable() {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [employeeid, setEmployeeId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChangeEmployeeId = (employeeId: any) => {
    setEmployeeId(employeeId);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/employee`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchProducts();
  }, []);

  const router = useRouter();

  const handleConfirmation = async () => {
    try {
      await postData();
      setShowConfirmation(false);
    } catch (e: any) {
      setError(e);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    router.push('/employee')
  };

  async function postData() {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/employee/remove/${employeeid}`,
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
          <h1 className="text-2xl text-left mb-2"> All Products:</h1>
          <form onSubmit={handleSubmit}>
            <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Employee Salary</th>
                  <th className="px-4 py-2">Employee Joining Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {employee.map((employee) => (
                  <tr key={employee.employeeid}>
                    <td className="px-4 py-2">{employee.employeeid}</td>
                    <td className="px-4 py-2">{employee.userid}</td>
                    <td className="px-4 py-2">{employee.employeesalary}</td>
                    <td className="px-4 py-2">
                      {employee.employeejoiningdate}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        value={employee.employeeid}
                        onClick={() =>
                          handleChangeEmployeeId(employee.employeeid)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to remove this employee?"
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}
    </ProtectedRoute>
  );
}

