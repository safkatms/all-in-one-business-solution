// components/Header.js

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className='text-white'>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
