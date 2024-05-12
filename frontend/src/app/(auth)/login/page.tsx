import Header from "@/components/publicheader";
import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <Header />
      <div className="container mx-auto h-screen flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to All in One Business Solution</h1>
          <h6 className="font-normal">All Business Solution in One Platform!</h6>
          <button className="bg-customTeal text-white rounded-lg font-semibold py-1 px-1">REGISTRATION</button>
        </div>
        <div className="bg-white m-10 shadow-2xl">
            <h1 className="text-4xl font-extrabold flex justify-center mt-8">Login</h1>
            <form>
                <table className="m-8"> 
                    <tbody>
                        <tr><td colSpan={2}><label className="text-lg">Username</label></td></tr>
                        <tr><td colSpan={2}><input type="text" name="" id="" className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"/></td></tr>
                        <tr><td colSpan={2}><label className="text-lg">Password</label></td></tr>
                        <tr><td colSpan={2}><input type="password" name="" id="" className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"/></td></tr>
                        <tr><td colSpan={2}><button className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3">Login</button></td></tr>
                        <tr><td><input type="checkbox" name="" id="" /> <label className="text-s">Show Password</label></td>
                        <td><Link href="/" className="ml-3 hover:text-gray-300">Forget password?</Link></td></tr>
                        <tr><td colSpan={2}>Don't have an account? <Link href="/signup" className="ml-3 hover:text-gray-300">Register</Link></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
      </div>
    </div>
  );
}
