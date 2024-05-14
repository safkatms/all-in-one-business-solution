import Header from "@/components/publicheader";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto h-screen items-center">
      <div className="m-4 ">
          <h1 className="text-3xl font-bold">
            Welcome to All in One Business Solution
          </h1>
          <h6 className="font-normal">
            All Business Solution in One Platform!
          </h6>
          <Link href="/signup">
            <button className="bg-customTeal text-white rounded-lg font-semibold py-1 px-1">
              REGISTRATION
            </button>
          </Link>
        </div>
        <div className="bg-white shadow-2xl rounded-lg mt-4">
          <h1 className="text-4xl font-extrabold flex justify-center p-2 ">
            Packages
          </h1>
            <div className="flex justify-center w-auto h-auto items-center p-2">
              <div className="bg-customBlack shadow-2xl m-4 p-4 rounded-xl ">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  Standard plan
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    9.99
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                  <li className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      1 User
                    </span>
                  </li>
                  <li className="flex line-through decoration-gray-500">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                      HR Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Accounts Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Inventory Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Sales Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Customer Management
                    </span>
                  </li>
                </ul>
               
              </div>
              <div
                className="bg-customBlack shadow-2xl m-4 p-4 rounded-xl 
                "
              >
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  Premium plan
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    29.9
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Multiple Users
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      HR Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Accounts Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Inventory Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Sales Management
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-customTeal dark:text-customTeal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Customer Management
                    </span>
                  </li>
                </ul>

              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
