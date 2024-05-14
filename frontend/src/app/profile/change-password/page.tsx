"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import ProtectedRoute from "@/utils/protectedRoute";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";

export default function Signup() {
  const router = useRouter();
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for controlling password visibility

  const handleChangecurrentPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setcurrentPassword(e.target.value);
  };
  const handleChangeconfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(e.target.value);
  };
  
  const handleChangenewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setnewPassword(e.target.value);
  };
  

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setError("");

    // Validate form fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await postData();
      console.log("Password changed successfully:", response);
      setError("Password changed successfully");
      setcurrentPassword("");
      setnewPassword("");
      setconfirmPassword("");
      router.push("/profile");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Error");
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/user/change-password`,
        formData,
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
      throw new Error("Error change pass");
    }
  }

  return (
    <ProtectedRoute
      requiredRole={[
        "admin",
        "owner",
        "hr",
        "accountant",
        "inventory_manager",
        "salesman",
      ]}
    >
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div className="bg-white my-10 w-screen h-fit shadow-2xl rounded-xl">
          <h1 className="text-4xl font-extrabold flex justify-center p-8">
            Change password
          </h1>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="p-8 flex justify-center">
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Current Password</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChangecurrentPassword}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">New Password</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChangenewPassword}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Confirm Password</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChangeconfirmPassword}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  
                  <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={toggleShowPassword} 
                    />
                    <label className="text-s">Show Password</label>
                  </td>
                </tr>
                  <tr className="text-center">
                    <td>
                      <button
                        type="submit"
                        className="bg-customTeal text-white rounded-lg font-semibold  mt-2 py-2 px-6"
                      >
                        Save
                      </button>
                    </td>
                    <td>
                      <Link href="/profile">
                        <button
                          type="button"
                          className="bg-red-600 text-white rounded-lg font-semibold  mt-2 py-2 px-3"
                        >
                          Cancle
                        </button>
                      </Link>
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
}
