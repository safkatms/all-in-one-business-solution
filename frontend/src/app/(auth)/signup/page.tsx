"use client";
import Header from "@/components/publicheader";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [company, setCompany] = useState("");
  const [gender, setgender] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for controlling password visibility

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
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeConPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
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
      company,
      gender,
      password,
      conPassword,
    });

    setError("");

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !mobileNo ||
      !company ||
      !gender ||
      !password ||
      !conPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== conPassword) {
      setError("Passwords do not match");
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

    if (!company.match(/^[A-Z]+$/)) {
      setError(
        "Company must be all uppercase, with no numbers, spaces, or special characters."
      );
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

    // Perform additional validations...

    try {
      const response = await postData();
      console.log("User created successfully:", response);
      setError("User created successfully");
      // Reset form fields
      setfirstName("");
      setlastName("");
      setusername("");
      setemail("");
      setmobileNo("");
      setCompany("");
      setgender("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Username/Email/Company Already Exist");
    }
  };

  async function postData() {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("mobileNo", mobileNo);
      formData.append("company", company);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("conPassword", conPassword);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/user/registration`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
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
    <>
      <Header />
      <div className="min-w-screen min-h-screen items-center bg-gradient-to-b from-customCyan to-customWhite">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome to All in One Business Solution
            </h1>
            <h6 className="font-normal">
              All Business Solution in One Platform!
            </h6>
            <Link href="/login">
              <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-customTeal text-white rounded-lg font-semibold py-2 px-3">
                Login
              </button>
            </Link>
          </div>
          <div className="bg-white m-10 min-w-96 shadow-2xl rounded-lg ring-offset-2 ring-2 border">
            <h1 className="text-4xl font-extrabold flex justify-center mt-8">
              Signup
            </h1>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <table className="m-8 flex justify-center">
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
                    <td>
                      <label className="text-lg">Email</label>
                    </td>
                    <td>
                      <label className="text-lg">Mobile Number</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChangeEmail}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                    <td>
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
                      <label className="text-lg">Password</label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChangePassword}
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
                        name="conPassword"
                        value={conPassword}
                        onChange={handleChangeConPassword}
                        className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button
                        type="submit"
                        className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3 hover:bg-indigo-500"
                      >
                        Signup
                      </button>
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
                  <tr>
                    <td colSpan={2}>
                      Already have an account?
                      <Link href="/login" className="ml-3 hover:text-indigo-500">
                        Login
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
