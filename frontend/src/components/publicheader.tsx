import Link from "next/link";

const Header = () => {
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
