import Header from "@/components/publicheader";
import React from "react";
import Link from "next/link";

export default function Signup() {
  return (
    <div>
      <Header />
      <div className="container mx-auto h-screen flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to All in One Business Solution
          </h1>
          <h6 className="font-normal">
            All Business Solution in One Platform!
          </h6>
          <button className="bg-customTeal text-white rounded-lg font-semibold py-1 px-12">
            Login
          </button>
        </div>
        <div className="bg-white m-10 shadow-2xl">
          <h1 className="text-4xl font-extrabold flex justify-center mt-8">
            Registration
          </h1>
          <form>
            <table className="m-8">
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
                      name=""
                      id=""
                      className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name=""
                      id=""
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
                      name=""
                      id=""
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
                      name=""
                      id=""
                      className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name=""
                      id=""
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
                      name=""
                      id=""
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
                  <td colSpan={2} className="flex justify-between items-center">
                    <input type="radio" name="Gender" id="male" />
                    <label htmlFor="male">Male</label>
                    <input type="radio" name="Gender" id="female" />
                    <label htmlFor="female">Female</label>
                    <input type="radio" name="Gender" id="others" />
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
                      type="password"
                      name=""
                      id=""
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
                      type="password"
                      name=""
                      id=""
                      className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3">
                      Signup
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" name="" id="" />
                    <label className="text-s">Show Password</label>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Already have an account?
                    <Link href="/login" className="ml-3 hover:text-gray-300">
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
  );
}
