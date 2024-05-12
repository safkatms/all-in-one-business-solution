"use client";
import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className={`bg-customBlack h-screen p-5 duration-300 relative ${open?"w-72":"w-10 bg-transparent"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-10 h-10 text-white absolute right-3 ${!open && "rotate-180"}`}
          onClick={()=>setOpen(!open)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
    </div>
  );
};


export default Sidebar;
