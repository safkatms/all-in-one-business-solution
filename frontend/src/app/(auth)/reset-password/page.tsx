"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/publicheader";
import React, { SyntheticEvent } from "react";
import Link from "next/link";

function Reset() {
    const router = useRouter();

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push("/login");
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="bg-white p-14 shadow-2xl">
            <h1 className="text-4xl font-extrabold flex justify-center mt-8">Reset Password</h1>
            <form onSubmit={handleLogin}>
                <table className="m-8"> 
                    <tbody>
                        <tr><td ><label className="text-lg">Password</label></td></tr>
                        <tr><td ><input type="password" name="" id="" className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"/></td></tr>
                        <tr><td ><label className="text-lg">Token</label></td></tr>
                        <tr><td ><input type="text" name="" id="" className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"/></td></tr>
                        <tr><td ><button type="submit" className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3">Reset</button></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
