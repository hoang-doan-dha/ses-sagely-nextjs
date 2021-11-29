import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Header: NextPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <header>
      <nav className="flex justify-between text-white w-full p-4 bg-indigo-600">
        <div className="flex items-center">
          <Link href='/' >
            <a className="text-2xl font-bold font-heading text-white">Sagely Home</a>
          </Link>
        </div>
        <div className="flex min-h-full items-center">
          <ul className="hidden md:flex px-4 mx-auto font-bold font-heading text-xl space-x-12">
            <li>
              <Link href='/emails' >
                <a className="text-2xl font-bold font-heading text-white">SES Mock</a>
              </Link>
            </li>
            <li>
              <Link href='/communications' >
                <a className="text-2xl font-bold font-heading text-white">Communications CLI</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative flex">
          <div className="xl:flex min-h-full items-center">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex h-full items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Username</span>
            </button>
          </div>
          {dropdownOpen &&
            <div className="absolute top-8 right-0 p-2 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20">
              <button onClick={() => setLoading(true)} className="w-full">
                <Link href='/logout' >
                  <a className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200">Sign out</a>
                </Link>
              </button>
            </div>
          }
        </div>
      </nav>
    </header>
  )
}

export default Header;