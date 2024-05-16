import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-customBlack py-4">
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8 ">
        {/* Logo or site title */}
        <h1 className=" py-100">
          <Link href="/">
            <Image
              src="/aiobs2.png"
              alt="AIOBS Logo"
              width={130}
              height={20}
              className=""
            />
          </Link>
        </h1>
        <nav className="text-end">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-white hover:text-gray-300">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
