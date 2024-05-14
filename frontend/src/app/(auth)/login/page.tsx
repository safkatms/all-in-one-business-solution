'use client'
import Header from "@/components/publicheader";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for controlling password visibility

  const router = useRouter();

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", { username, password });
    if (!username || !password) {
      setError("All fields are required");
    } else {
      try {
        const response = await postData();
        const token = response.data.access_token;
        Cookies.set("jwtToken", token, { expires: 7 });
        alert("Login successful");
        setPassword("");
        if (!response.data.packageId) {
          router.push("/package");
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        setError("Invalid Credential");
      }
    }
  };

  async function postData() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/auth/login`,
        { username, password },
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
      <div className="container mx-auto h-screen flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to All in One Business Solution
          </h1>
          <h6 className="font-normal">All Business Solution in One Platform!</h6>
          <Link href="/signup">
            <button className="bg-customTeal text-white rounded-lg font-semibold py-1 px-1">
              REGISTRATION
            </button>
          </Link>
        </div>
        <div className="bg-white m-10 shadow-2xl">
          <h1 className="text-4xl font-extrabold flex justify-center mt-8">
            Login
          </h1>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <table className="m-8">
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <label className="text-lg">Username</label>
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
                    <label className="text-lg">Password</label>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between text and password type
                      name="password"
                      value={password}
                      onChange={handleChangePassword}
                      className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3">
                      Login
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={showPassword} // Bind the checkbox to the showPassword state
                      onChange={toggleShowPassword} // Call toggleShowPassword when the checkbox changes
                    />{" "}
                    <label className="text-s">Show Password</label>
                  </td>
                  <td>
                    <Link
                      href="/forget-password"
                      className="ml-3 hover:text-gray-300"
                    >
                      Forget password?
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Don't have an account?{" "}
                    <Link href="/signup" className="ml-3 hover:text-gray-300">
                      Register
                    </Link>
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
