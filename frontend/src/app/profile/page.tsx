"use client";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";

interface Profile {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  company: string;
  gender: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        const response = await axios.get<Profile>(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

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
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Sidebar />
        <div className="bg-white my-10  mx-2 m-10 w-screen shadow-2xl rounded-lg ring-offset-2 ring-2 border">
          <h1 className="text-4xl font-extrabold flex justify-center p-8">
            Profile
          </h1>
          {profile && (
            <div className="p-8 flex justify-center">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className="text-lg">Firstname</label>
                    </td>
                    <td>
                      <label className="text-lg">Lastname</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        readOnly
                        name="firstName"
                        value={profile.firstName}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        readOnly
                        name="lastName"
                        value={profile.lastName}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label>Username</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        readOnly
                        name="username"
                        value={profile.username}
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
                        readOnly
                        name="email"
                        value={profile.email}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Mobile Number</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        readOnly
                        name="mobileNo"
                        value={profile.mobileNo}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Company</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type="text"
                        readOnly
                        name="company"
                        value={profile.company}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label className="text-lg">Gender</label>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="flex justify-between items-center"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={profile.gender === "male"}
                        readOnly
                        id="male"
                      />
                      <label htmlFor="male">Male</label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={profile.gender === "female"}
                        readOnly
                        id="female"
                      />
                      <label htmlFor="female">Female</label>
                      <input
                        type="radio"
                        name="gender"
                        value="others"
                        checked={profile.gender === "others"}
                        readOnly
                        id="others"
                      />
                      <label htmlFor="others">Others</label>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td>
                      <Link href="/profile/update">
                        <button
                          type="button"
                          className="bg-customTeal text-white rounded-lg font-semibold w-1/2 mt-2 py-2 px-3"
                        >
                          Update Profile
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link href="/profile/change-password">
                        <button
                          type="button"
                          className="bg-customTeal text-white rounded-lg font-semibold w-1/2 mt-2 py-2 px-3"
                        >
                          Change Password
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
