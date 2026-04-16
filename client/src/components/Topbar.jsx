import React, { useContext } from "react";
import { HiOutlineHome, HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import NotificationBadge from "./NotificationBell";

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
      {/* Search / Breadcrumbs Placeholder */}
      <div className="hidden md:flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-96 group focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        <HiOutlineSearch className="text-gray-400 text-xl" />
        <input 
          type="text" 
          placeholder="Search for parcels, drivers..." 
          className="bg-transparent border-none focus:outline-none text-sm w-full font-medium"
        />
      </div>

      <div className="flex items-center gap-2 md:hidden">
         <Link to="/" className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="font-bold italic">C</span>
         </Link>
      </div>

      {/* User Info + Notifications */}
      {user && (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <HiOutlineHome className="text-2xl" />
            </Link>
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
                className="w-11 h-11 rounded-2xl border-2 border-gray-50 object-cover shadow-sm group-hover:shadow-md transition-shadow"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
