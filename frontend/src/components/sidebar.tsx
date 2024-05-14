"use client";
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [expandH, setExpandH] = useState(false);
  const [expandI, setExpandI] = useState(false);
  const [expandS, setExpandS] = useState(false);
  return (
    <div>
      <div
        className={`bg-customBlack h-screen p-5 duration-300 relative ${
          open ? "w-72" : "w-10 bg-transparent"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-10 h-10 text-white absolute right-3 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className={`items-center mt-14 ${open?"flex":"hidden"}`}>
          <ul className="relative justify-between ">
          <li>
            <Link href='/dashboard' className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-customBlack2 text-white ">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3">Dashboard</span>
            </Link>
         </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-customBlack2 text-white "
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => setExpandH(!expandH)}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  HR
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
                
              </button>
              <ul
                id="dropdown-example"
                className={`py-2 space-y-2 ${expandH ? "" : "hidden"}`}
              >
                <li>
                  <a
                    href="/employee"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Employee
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Payroll
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Leave
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-customBlack2 text-white "
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => setExpandI(!expandI)}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path fill="currentColor" d="M10.591 2.513a3.75 3.75 0 0 1 2.818 0l7.498 3.04A1.75 1.75 0 0 1 22 7.175v9.653a1.75 1.75 0 0 1-1.093 1.621l-7.498 3.04a3.75 3.75 0 0 1-2.818 0l-7.498-3.04A1.75 1.75 0 0 1 2 16.827V7.176a1.75 1.75 0 0 1 1.093-1.622zm2.254 1.39a2.25 2.25 0 0 0-1.69 0L9.24 4.68l7.527 2.927l2.669-1.03zm1.846 4.505L7.215 5.5L4.59 6.564l7.411 2.882zM3.5 16.828a.25.25 0 0 0 .156.231l7.499 3.04q.047.02.095.036v-9.371L3.5 7.75zm9.345 3.271l7.499-3.04a.25.25 0 0 0 .156-.232V7.774l-7.75 2.992v9.37z"></path>
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Inventory
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
                
              </button>
              <ul
                id="dropdown-example"
                className={`py-2 space-y-2 ${expandI ? "" : "hidden"}`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Product
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Purchase
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-customBlack2 text-white "
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => setExpandS(!expandS)}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path fill="currentColor" d="M7 18c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m10 0c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m-9.8-3.2c0 .1.1.2.2.2H19v2H7c-1.1 0-2-.9-2-2c0-.4.1-.7.2-1l1.3-2.4L3 4H1V2h3.3l4.3 9h7l3.9-7l1.7 1l-3.9 7c-.3.6-1 1-1.7 1H8.1l-.9 1.6zM9.4 1c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4S8 3.2 8 2.4S8.7 1 9.4 1m5.2 8c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4s1.4.6 1.4 1.4S15.3 9 14.6 9M9.2 9L8 7.8L14.8 1L16 2.2z"></path>
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Sales
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
                
              </button>
              <ul
                id="dropdown-example"
                className={`py-2 space-y-2 ${expandS ? "" : "hidden"}`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Make an Order
                  </a>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-customBlack2"
                  >
                    Customer
                  </Link>
                </li>
              </ul>
            </li>
            <hr />
            <li>
            <Link href='/profile' className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group hover:bg-customBlack2 text-white ">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
               <path fill="currentColor" d="m10.135 21l-.362-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l2.344 1.758l-1.865 3.25l-2.681-1.154q-.467.393-.94.673t-.985.445L13.866 21zm1.838-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727"></path>
               </svg>
               <span className="ms-3">Settings</span>
            </Link>
         </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
