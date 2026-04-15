import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 mt-10">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <img
              src="/default-avatar.png"
              alt="Courier MS Logo"
              className="h-10 w-10 rounded-full"
            />
            <h2 className="text-white font-bold text-xl">
              Courier MS
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            A modern Courier Management System providing fast, secure, and
            reliable delivery solutions for businesses and individuals.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/services" className="hover:text-blue-400">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/track-parcel" className="hover:text-blue-400">Track Parcel</a></li>
          </ul>
        </div>

        {/* CONTACT + SOCIAL MEDIA */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect With Us</h3>

          <div className="space-y-2 text-sm text-gray-400">
            <p>📞 +977-9800000000</p>
            <p>✉️ support@courierms.com</p>
            <p>📍 Kathmandu, Nepal</p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-4 mt-4">

            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF />
            </a>

            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition">
              <FaInstagram />
            </a>

            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition">
              <FaLinkedinIn />
            </a>

            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-400 transition">
              <FaTwitter />
            </a>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-gray-500 text-sm">
        © 2026 Courier Management System. Built for Final Year Project.
      </div>

    </footer>
  );
};

export default Footer;