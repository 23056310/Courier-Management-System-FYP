import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img src="/default-avatar.png" alt="Courier MS Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-blue-600">Courier MS</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li><a href="/" className="hover:text-blue-500">Home</a></li>
        <li><a href="/about" className="hover:text-blue-500">About</a></li>
        <li><a href="/services" className="hover:text-blue-500">Services</a></li>
        <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
      </ul>

      {/* Action Button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Track / Login
      </button>
    </nav>
  );
};

export default Navbar;