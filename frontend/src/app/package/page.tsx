"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from 'js-cookie';
import InsideHeader from "@/components/insideheader";
import ProtectedRoute from "@/utils/protectedRoute";

function Package() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", { name });
    if (!name) {
      
      alert("Select a Package");
    } else {
      try {
        const response = await postData();
        router.push("/payment");
      } catch (error) {
        setError("Error logging in");
      }
    }
  };

  async function postData() {
    try {
      const token = Cookies.get('jwtToken');

      if (!token) {
          setError('No token found');
          return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/packages/purchase`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  return (
    <ProtectedRoute requiredRole={"owner"}>
      <InsideHeader />
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="bg-white shadow-2xl">
          <h1 className="text-4xl font-extrabold flex justify-center mt-8 ">
            Select a Package
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between w-auto h-auto items-center p-2 mt-10 ">
              <div className="bg-customBlack shadow-2xl m-4 p-4 rounded-xl ">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  Standard plan
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    9.99
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                  <li className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      1 User
                    </span>
                  </li>
                  <li className="flex line-through decoration-gray-500">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                      HR Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Accounts Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Inventory Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Sales Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Customer Management
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  id="standard"
                  onClick={() => setName("standard")}
                  className="text-white bg-customTeal hover:bg-customBlack2 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Choose plan
                </button>
              </div>
              <div
                className="bg-customBlack shadow-2xl m-4 p-4 rounded-xl 
                "
              >
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  Premium plan
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    29.9
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Multiple Users
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      HR Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Accounts Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Inventory Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Sales Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Customer Management
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  id="premium"
                  onClick={() => setName("premium")}
                  className="text-white bg-customTeal hover:bg-customBlack2 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Choose plan
                </button>
              </div>
            </div>
            <div className="flex justify-end m-2">
              <div className="text-white bg-customTeal hover:bg-customBlack2 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center text-center">
                <button type="submit" className="flex justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <label className="text-white text-xl ml-1 font-semibold">
                    Buy
                  </label>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Package;
