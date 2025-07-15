import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="w-1/4">Logo</div>

        <ul className="hidden md:flex justify-center space-x-6 w-2/4 text-lg font-semibold">
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 cursor-pointer">Venue</li>
          <li className="hover:text-gray-300 cursor-pointer">Gallery</li>
          <li className="hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:text-gray-300 cursor-pointer">Profile</li>
        </ul>

        <div className="hidden md:block w-1/4 text-right">
          <button className="bg-orange-600 text-black px-4 py-1 rounded-2xl hover:bg-gray-100 font-medium">
            Contact Us
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
          <div className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-transparent bg-opacity-40 backdrop-blur-md text-white p-6 space-y-4 z-50 transition-all duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-2xl text-white"
            >
              ✕
            </button>
            <ul className="space-y-4 font-semibold text-lg">
              <li className="hover:text-gray-300 cursor-pointer">Home</li>
              <li className="hover:text-gray-300 cursor-pointer">Venue</li>
              <li className="hover:text-gray-300 cursor-pointer">Gallery</li>
              <li className="hover:text-gray-300 cursor-pointer">Services</li>
              <li className="hover:text-gray-300 cursor-pointer">Profile</li>
              <li>
                <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-100 font-medium">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
      )}
    </nav>
  );
};

export default Navbar;
