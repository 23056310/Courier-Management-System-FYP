import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Track Parcel", path: "/track-parcel" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white ${
        scrolled ? "py-3 shadow-md border-b border-gray-100" : "py-5 border-b border-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-50 shadow-sm group-hover:shadow-md transition-all overflow-hidden border border-gray-100">
            <img
              src="/default-avatar.png"
              alt="Courier MS Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-gray-900">
            Courier<span className="text-primary italic">MS</span>
          </h1>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
                    isActive ? "text-primary px-2" : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* AUTH BUTTONS */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/login"
            className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3.5 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Register
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-3xl text-gray-900 p-2 hover:bg-gray-50 rounded-xl transition-colors"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 top-0 bg-white z-[90] transition-transform duration-500 lg:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } pt-24 px-8`}
      >
        <div className="space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-3xl font-black text-gray-900 hover:text-primary transition-colors border-b border-gray-50 pb-6 italic"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-10 flex flex-col space-y-4">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-5 font-black text-gray-900 border-2 border-gray-100 rounded-2xl uppercase tracking-[0.2em] text-xs"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-5 font-black bg-primary text-white rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;