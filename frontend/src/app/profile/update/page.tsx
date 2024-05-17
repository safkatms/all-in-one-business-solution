"use client";
import Header from "@/components/publicheader";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
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

export default function UpdateProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const router = useRouter();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [company, setCompany] = useState("");
  const [gender, setgender] = useState("");
  const [error, setError] = useState("");

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setfirstName(e.target.value);
  };
  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setlastName(e.target.value);
  };
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };
  const handleChangeMobile = (e: ChangeEvent<HTMLInputElement>) => {
    setmobileNo(e.target.value);
  };
  const handleChangeCompany = (e: ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };
  const handleChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    setgender(e.target.id);
  };

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
        setfirstName(response.data.firstName);
        setlastName(response.data.lastName);
        setusername(response.data.username);
        setemail(response.data.email);
        setmobileNo(response.data.mobileNo);
        setCompany(response.data.company);
        setgender(response.data.gender);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      firstName,
      lastName,
      username,
      email,
      mobileNo,
      company,
      gender,
    });
    setError("");
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !mobileNo ||
      !company ||
      !gender
    ) {
      setError("All fields are required");
      return;
    }

    if (!firstName.match(/^[A-Z][a-z]*$/)) {
      setError(
        "First name must start with a capital letter and contain no numbers or special characters."
      );
      return;
    }

    if (!lastName.match(/^[A-Z][a-z]*$/)) {
      setError(
        "Last name must start with a capital letter and contain no numbers or special characters."
      );
      return;
    }
    if (!mobileNo.match(/^01[3-9]\d{8}$/)) {
      setError("Mobile number must be a valid Bangladesh number.");
      return;
    }

    try {
      const response = await postData();
      console.log("User created successfully:", response);
      setError("User created successfully");
      router.push("/profile");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Username/Email/Company Already Exist");
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("mobileNo", mobileNo);
      formData.append("gender", gender);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/user/profile/update`,
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
      throw new Error("Error creating user");
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
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <h1 className="text-4xl font-extrabold flex justify-center p-8">
                Update Profile
              </h1>
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
              <div className="p-8 flex justify-center">
                <form onSubmit={handleSubmit}>
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
                            name="firstName"
                            value={firstName}
                            onChange={handleChangeFirstName}
                            className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleChangeLastName}
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
                            value={username}
                            onChange={handleChangeUsername}
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
                            value={email}
                            onChange={handleChangeEmail}
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
                            name="mobileNo"
                            value={mobileNo}
                            onChange={handleChangeMobile}
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
                            value={company}
                            onChange={handleChangeCompany}
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
                            checked={gender === "male"}
                            onChange={handleChangeGender}
                            id="male"
                          />
                          <label htmlFor="male">Male</label>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleChangeGender}
                            checked={gender === "female"}
                            id="female"
                          />
                          <label htmlFor="female">Female</label>
                          <input
                            type="radio"
                            name="gender"
                            value="others"
                            onChange={handleChangeGender}
                            checked={gender === "others"}
                            id="others"
                          />
                          <label htmlFor="others">Others</label>
                        </td>
                      </tr>
                      <tr className="text-center">
                        <td>
                          <button
                            type="submit"
                            className="bg-customTeal text-white rounded-lg font-semibold w-1/2 mt-2 py-2 px-3 hover:bg-teal-500"
                          >
                            Save
                          </button>
                        </td>
                        <td>
                          <Link href="/profile">
                            <button
                              type="button"
                              className="bg-red-600 text-white rounded-lg font-semibold w-1/2 mt-2  hover:bg-red-500 py-2 px-3"
                            >
                              Cancel
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
        </div>
      </div>
    </ProtectedRoute>
  );
}
