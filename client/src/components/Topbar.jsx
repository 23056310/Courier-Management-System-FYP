import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import NotificationBadge from "./NotificationBell"; // ✅ import badge

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Home Link with Icon */}
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
      >
        <FaHome className="text-xl" />
        <span className="font-bold text-lg">Home</span>
      </Link>

      {/* User Info + Notifications */}
      {user && (
        <div className="flex items-center gap-6">
          {/* 🔔 Notification Badge */}
          <NotificationBadge />

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">{user.role || "User"}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <img
              src={user.profilePic || "/default-avatar.png"}
              alt={user.name || "User"}
              className="w-10 h-10 rounded-full border object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
}
