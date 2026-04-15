import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaBox,
  FaUsers,
  FaTruck,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  /* ================= ROLE BASED MENU ================= */

  const navItemsByRole = {
    admin: [
      { label: "Dashboard", icon: <FaChartBar />, to: "/admin/dashboard" },
      { label: "Manage Parcels", icon: <FaBox />, to: "/admin/parcels" },
      { label: "Customers", icon: <FaUsers />, to: "/admin/customers" },
      { label: "Drivers", icon: <FaTruck />, to: "/admin/drivers" },
      { label: "Inquiries", icon: <FaClipboardList />, to: "/admin/inquiries" },
      { label: "Reports", icon: <FaChartBar />, to: "/admin/reports" },
      { label: "Settings", icon: <FaCog />, to: "/admin/settings" },
    ],

    customer: [
      { label: "Dashboard", icon: <FaChartBar />, to: "/dashboard" },
      { label: "My Parcels", icon: <FaBox />, to: "/my-parcels" },
      { label: "Parcel History", icon: <FaHistory />, to: "/parcel-history" },
      { label: "Profile", icon: <FaUser />, to: "/profile" },
    ],

    driver: [
      { label: "Dashboard", icon: <FaChartBar />, to: "/driver/dashboard" },
      { label: "Assigned Parcels", icon: <FaBox />, to: "/driver/parcels" },
      { label: "Delivery History", icon: <FaHistory />, to: "/driver/history" },
      { label: "Profile", icon: <FaUser />, to: "/profile" },
    ],
  };

  const navItems = navItemsByRole[user?.role] || [];

  return (
    <aside
      className={`bg-blue-700 text-white flex flex-col min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-blue-500">
        {!collapsed && (
          <span className="text-xl font-bold">
            {user?.role === "admin"
              ? "Admin Panel"
              : user?.role === "driver"
              ? "Driver Panel"
              : "Customer Panel"}
          </span>
        )}

        <button onClick={toggleSidebar} className="text-white text-xl">
          <FaBars />
        </button>
      </div>

      {/* NAVIGATION */}
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

      {/* LOGOUT */}
      <div className="px-2 py-6 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-600 w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ icon, label, to, active, collapsed }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${active ? "bg-blue-600" : "hover:bg-blue-600"} 
        ${collapsed ? "justify-center" : ""}`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
}