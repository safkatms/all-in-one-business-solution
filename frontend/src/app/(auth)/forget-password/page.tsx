"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/publicheader";
import React, { SyntheticEvent } from "react";
import Link from "next/link";

function Forget() {
    const router = useRouter();

    const handleReset = (e: SyntheticEvent) => {
      e.preventDefault();
      router.push("/reset-password");
    };
  return (
    <div>
      <Header />
      <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="bg-white p-14 shadow-2xl">
            <h1 className="text-4xl font-extrabold flex justify-center mt-8">Forget Password</h1>
            <form onSubmit={handleReset}>
                <table className="m-8"> 
                    <tbody>
                        <tr><td ><label className="text-lg">Email</label></td></tr>
                        <tr><td ><input type="email" name="" id="" className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"/></td></tr>
                        <tr><td ><button className="bg-customTeal text-white rounded-lg font-semibold w-full mt-2 py-2 px-3">Submit</button></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Forget;
