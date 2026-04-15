import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <div className="flex items-center space-x-2">
        <img
          src="/default-avatar.png"
          alt="Courier MS Logo"
          className="h-9 w-9 rounded-full"
        />
        <h1 className="text-xl font-bold text-blue-600">
          Courier MS
        </h1>
      </div>

      {/* LINKS */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">

        <li>
          <a href="/" className="hover:text-blue-500 transition">
            Home
          </a>
        </li>

        <li>
          <a href="/about" className="hover:text-blue-500 transition">
            About
          </a>
        </li>

        <li>
          <a href="/services" className="hover:text-blue-500 transition">
            Services
          </a>
        </li>

        <li>
          <a href="/contact" className="hover:text-blue-500 transition">
            Contact
          </a>
        </li>

        <li>
          <a href="/track-parcel" className="hover:text-blue-500 transition">
            Track Parcel
          </a>
        </li>

      </ul>

      {/* AUTH BUTTONS */}
      <div className="flex space-x-3">

        <a
          href="/login"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
        >
          Login
        </a>

        <a
          href="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Register
        </a>

      </div>

    </nav>
  );
};

export default Navbar;