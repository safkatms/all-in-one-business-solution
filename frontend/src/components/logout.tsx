"use client";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    Cookies.remove("username");
    Cookies.remove("usertype");
    Cookies.remove("company");
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
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
  );
};

export default LogoutButton;
