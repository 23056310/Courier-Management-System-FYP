
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaHotel,
  FaUsers,
  FaClipboardList,
  FaBed,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // ✅ Access user and logout

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  // ✅ Role-based navigation items
  const navItemsByRole = {
    admin: [
      { label: "Dashboard", icon: <FaChartBar />, to: "/admin-dashboard" },
      { label: "Manage Users", icon: <FaUsers />, to: "/manage-users" },
      { label: "Manage Inquiries", icon: <FaClipboardList />, to: "/manage-inquiries" },
      { label: "Verify Hostels", icon: <FaHotel />, to: "/verify-hostels" },
      { label: "Settings", icon: <FaCog />, to: "/settings" },
    ],
    owner: [
      { label: "Dashboard", icon: <FaChartBar />, to: "/owner-dashboard" },
      { label: "Manage Hostels", icon: <FaHotel />, to: "/manage-hostels" },
      { label: "Manage Bookings", icon: <FaClipboardList />, to: "/booking-request" },
      { label: "Manage Rooms", icon: <FaBed />, to: "/manage-rooms" },
    ],
    student: [
      { label: "Dashboard", icon: <FaChartBar />, to: "/student-dashboard" },
      { label: "Hostel List", icon: <FaHotel />, to: "/Hostel-List" },
      { label: "My Bookings", icon: <FaClipboardList />, to: "/my-bookings" },
    ],
  };

  // ✅ Get items based on user role
  const navItems = user?.role ? navItemsByRole[user.role] || [] : [];

  return (
    <aside
      className={`bg-blue-700 text-white flex flex-col min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo / Title */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-blue-500">
        {!collapsed && (
          <span className="text-2xl font-bold">
            {user?.role === "admin"
              ? "Admin Panel"
              : user?.role === "owner"
              ? "Owner Panel"
              : "Student Panel"}
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white text-xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            collapsed={collapsed}
            active={location.pathname === item.to}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-6 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-blue-600 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, to, active, collapsed }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${active ? "bg-blue-600" : "hover:bg-blue-600"} ${
        collapsed ? "justify-center" : ""
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
}
