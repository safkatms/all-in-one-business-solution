import Link from "next/link";

const InsideHeader = () => {
  return (
    <header className="bg-customBlack py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or site title */}
        <h1 className="text-white text-lg font-semibold text-start">
          <Link href="/">All-in-One Business Solution</Link>
        </h1>
        {/* Navigation links */}
        <nav className="flex text-end">
          <ul className="flex space-x-4">
            <li>
              <button
                type="button"
                className=" hover:bg-customBlack2 text-white font-semibold rounded focus:outline-none focus:shadow-outline mr-auto w-full h-6 sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v.777a5.15 5.15 0 0 0 4.5 5.199A5.006 5.006 0 0 0 21 25v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707M19 25a3 3 0 0 1-6 0v-1h6Zm8-3H5v-1.586l2.707-2.707A1 1 0 0 0 8 17v-4a8 8 0 0 1 16 0v4a1 1 0 0 0 .293.707L27 20.414Z"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <p className="text-white">Logged in As </p>
            </li>

            <li>
              <button
                type="button"
                className=" hover:bg-customBlack2 text-white font-semibold rounded focus:outline-none focus:shadow-outline mr-auto w-full h-6 sm:w-auto flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 21V3h9v2H5v14h7v2zm13-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                  ></path>
                </svg>
                
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default InsideHeader;
