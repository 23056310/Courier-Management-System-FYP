import React, { useContext } from "react";
import { HiOutlineHome, HiOutlineBell, HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";
import NotificationBadge from "./NotificationBell";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const { toggleSidebar } = useLayout();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-40">
      {/* Left side actions */}
      <div className="flex items-center gap-3">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
        >
          <HiMenuAlt1 className="text-2xl" />
        </button>

        {/* Mobile Logo */}
        <div className="hidden sm:block lg:hidden">
          <Link to="/" className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="font-bold italic">C</span>
          </Link>
        </div>
        {/* Home Navigation */}
        <Link to="/" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all outline-none">
          <HiOutlineHome className="text-2xl" />
        </Link>
      </div>

      {/* User Info + Notifications */}
      {user && (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <NotificationBadge />
            </div>
          </div>

          <div className="h-8 w-px bg-gray-100" />

          {/* User Profile */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-gray-900 text-sm leading-tight capitalize">{user.role || "User"}</p>
              <p className="text-xs text-gray-400 font-medium">{user.email}</p>
            </div>
            <div className="relative">
              <img
                src={user.profilePic || "https://i.pravatar.cc/150?u=" + user.email}
                alt={user.name || "User"}
                className="w-11 h-11 rounded-full border-2 border-gray-50 object-cover shadow-sm group-hover:shadow-md transition-shadow"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${user.role === 'driver'
                    ? (user.driverStatus === 'Active' ? "bg-green-500" : "bg-red-500")
                    : "bg-green-500"
                  }`}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
