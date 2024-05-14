"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/publicheader";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";

function Reset() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    try {
      const response = await postData();
      alert("Reset password successful");
      setPassword("");
      setToken("");
      router.push("/login");
    } catch (error) {
      setError("Invalid token");
    }
  };

  async function postData() {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/auth/reset-password`,
        { password, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="bg-white p-14 shadow-2xl">
          <h1 className="text-4xl font-extrabold flex justify-center mt-8">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit}>
            <table className="m-8">
              <tbody>
                <tr>
                  <td>
                    <label className="text-lg">Password</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChangePassword}
                      className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="text-lg">Token</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="token"
                      value={token}
                      onChange={handleChangeToken}
                      className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="submit"
                      className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3"
                    >
                      Reset
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
