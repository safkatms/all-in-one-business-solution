"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";
import EmployeeTable from "@/components/employeeTable";

export default function Employee() {
  const router = useRouter();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [userType, setuserType] = useState("");
  const [employeesalary, setemployeesalary] = useState("");
  const [employeejoiningdate, setemployeejoiningdate] = useState("");
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
  const handleChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    setgender(e.target.id);
  };
  const handleChangepassword = (e: ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };
  const handleChangeuserType = (e: ChangeEvent<HTMLSelectElement>) => {
    setuserType(e.target.value);
  };

  const handleChangeSalary = (e: ChangeEvent<HTMLInputElement>) => {
    setemployeesalary(e.target.value);
  };

  const handleChangeJoiningDate = (e: ChangeEvent<HTMLInputElement>) => {
    setemployeejoiningdate(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      firstName,
      lastName,
      username,
      email,
      mobileNo,
      password,
      gender,
      employeesalary,
      employeejoiningdate,
      userType,
    });
    setError("");
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !mobileNo ||
      !password ||
      !employeesalary ||
      !employeejoiningdate ||
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

    if (!username.match(/^[a-z0-9_]+$/)) {
      setError(
        "Username must be lowercase, may include underscores and numbers, but no spaces or special characters."
      );
      return;
    }

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Invalid email address.");
      return;
    }

    if (!mobileNo.match(/^01[3-9]\d{8}$/)) {
      setError("Mobile number must be a valid Bangladesh number.");
      return;
    }

    if (
      !password.match(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?\/\\~`\-]).{6,}$/
      )
    ) {
      setError(
        "Password must be at least 6 characters long, include at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await postData();
      console.log("Employee created successfully:", response);
      setError("Employee created successfully");
      // Reset form fields
      setfirstName("");
      setlastName("");
      setusername("");
      setemail("");
      setmobileNo("");
      setgender("");
      setuserType("");
      setpassword("");
      setemployeesalary("");
      setemployeejoiningdate("");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Username/Email Already Exist");
    }
  };

  async function postData() {
    try {
      const token = getToken();
      const data1 = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        mobileNo: mobileNo,
        password: password,
        gender: gender,
        userType: userType,
        employeesalary: parseInt(employeesalary),
        employeejoiningdate: employeejoiningdate,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/employee/registration`,
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
      throw new Error("Error creating user");
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
              Employee Registration
            </h1>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
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
                        <label className="text-lg">Password</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="password"
                          value={password}
                          onChange={handleChangepassword}
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
                          onChange={handleChangeGender}
                          id="male"
                        />
                        <label htmlFor="male">Male</label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={handleChangeGender}
                          id="female"
                        />
                        <label htmlFor="female">Female</label>
                        <input
                          type="radio"
                          name="gender"
                          value="others"
                          onChange={handleChangeGender}
                          id="others"
                        />
                        <label htmlFor="others">Others</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <select
                          name="userType"
                          value={userType}
                          onChange={handleChangeuserType}
                          className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option id="" value="">
                            Select Company
                          </option>
                          <option value="hr">HR</option>
                          <option value="accountant">Accountant</option>
                          <option value="inventory_manager">
                            Inventory Manager
                          </option>
                          <option value="salesman">Sales Person</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <label className="text-lg">Salary</label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="number"
                          name="employeesalary"
                          value={employeesalary}
                          onChange={handleChangeSalary}
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
                          type="date"
                          name="employeejoiningdate"
                          value={employeejoiningdate}
                          onChange={handleChangeJoiningDate}
                          className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>
                        <button
                          type="submit"
                          className="bg-customTeal text-white rounded-lg font-semibold w-1/2 mt-2 py-2 px-3"
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          type="reset"
                          className="bg-red-600 text-white rounded-lg font-semibold w-1/2 mt-2 py-2 px-3"
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
