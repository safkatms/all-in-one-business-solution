"use client";
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
  const [showPassword, setShowPassword] = useState(false);

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
        Cookies.set("username", response.data.username, { expires: 7 });
        Cookies.set("usertype", response.data.userType, { expires: 7 });
        setPassword("");
        if (!response.data.packageId) {
          router.push("/package");
        } else if (response.data.userType == "admin") {
          router.push("/admin");
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
            <Link href="/signup">
              <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-customTeal text-white rounded-lg font-semibold py-2 px-3">
                REGISTER NOW
              </button>
            </Link>
          </div>
          <div className="bg-white m-10 min-w-96 shadow-2xl rounded-lg ring-offset-2 ring-2 border">
            <h1 className="text-4xl font-extrabold text-center mt-8">Login</h1>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <table className="m-8 flex justify-center">
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
                      <button className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3 hover:bg-indigo-500">
                        Login
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                      />{" "}
                      <label className="text-s">Show Password</label>
                    </td>
                    <td>
                      <Link
                        href="/forget-password"
                        className="ml-3 hover:text-indigo-500"
                      >
                        Forget password?
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      Dont have an account?
                      <Link
                        href="/signup"
                        className="ml-3 hover:text-indigo-500"
                      >
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
    </>
  );
}
