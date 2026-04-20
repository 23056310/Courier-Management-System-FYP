import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  HiOutlineChartBar, 
  HiOutlineCube, 
  HiOutlineUsers, 
  HiOutlineTruck, 
  HiOutlineClipboardList, 
  HiOutlineCog, 
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineSearch,
  HiX
} from "react-icons/hi";
import { AuthContext } from "../context/AuthContext"; 
import { useLayout } from "../context/LayoutContext";
import { toast } from "react-hot-toast";

export default function Sidebar() {
  const { isSidebarOpen, isSidebarCollapsed, toggleCollapse, closeSidebar } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  /* ================= ROLE BASED MENU ================= */

  const navItemsByRole = {
    admin: [
      { label: "Overview", icon: <HiOutlineChartBar />, to: "/admin/dashboard" },
      { label: "Parcels", icon: <HiOutlineCube />, to: "/admin/parcels" },
      { label: "Customers", icon: <HiOutlineUsers />, to: "/admin/customers" },
      { label: "Drivers", icon: <HiOutlineTruck />, to: "/admin/drivers" },
      { label: "Inquiries", icon: <HiOutlineClipboardList />, to: "/admin/inquiries" },
      { label: "Reports", icon: <HiOutlineChartBar />, to: "/admin/reports" },
      { label: "Settings", icon: <HiOutlineCog />, to: "/admin/settings" },
    ],

    customer: [
      { label: "Dashboard", icon: <HiOutlineChartBar />, to: "/customer/dashboard" },
      { label: "Create Parcel", icon: <HiOutlineClipboardList />, to: "/customer/create-parcel" },
      { label: "My Parcels", icon: <HiOutlineCube />, to: "/customer/parcels" },
      { label: "Track Parcel", icon: <HiOutlineSearch />, to: "/customer/track-parcel" },
      { label: "Profile", icon: <HiOutlineUserCircle />, to: "/profile" },
    ],

    driver: [
      { label: "Dashboard", icon: <HiOutlineChartBar />, to: "/driver/dashboard" },
      { label: "My Deliveries", icon: <HiOutlineCube />, to: "/driver/my-parcels" },
      { label: "Profile", icon: <HiOutlineUserCircle />, to: "/profile" },
    ],
  };

  const navItems = navItemsByRole[user?.role] || [];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`bg-gray-900 text-white flex flex-col h-screen fixed lg:sticky top-0 left-0 z-[60] transition-all duration-300 transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isSidebarCollapsed ? "w-24" : "w-72"}
        `}
      >
        {/* HEADER / LOGO */}
        <div className="flex items-center justify-between px-6 py-8">
          {(!isSidebarCollapsed || isSidebarOpen) && (
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <span className="text-xl font-bold italic">C</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Courier<span className="text-primary italic">MS</span>
              </span>
            </Link>
          )}
          
          {isSidebarCollapsed && !isSidebarOpen && (
            <Link to="/" className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 mx-auto">
              <span className="text-xl font-bold italic">C</span>
            </Link>
          )}

          {/* Mobile Close Button */}
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        <button 
          onClick={toggleCollapse}
          className="mx-6 mb-6 p-3 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-all flex items-center justify-center hidden lg:flex"
        >
          <HiOutlineMenuAlt2 className="text-xl" />
        </button>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {(!isSidebarCollapsed || isSidebarOpen) && <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 px-4">Menu</p>}
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              collapsed={isSidebarCollapsed && !isSidebarOpen}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        {/* USER & LOGOUT */}
        <div className="p-4 bg-gray-950/50 mt-auto">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:text-white hover:bg-red-500/10 group transition-all w-full ${
              isSidebarCollapsed && !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <HiOutlineLogout className="text-2xl group-hover:text-red-500 transition-colors" />
            {(!isSidebarCollapsed || isSidebarOpen) && <span className="font-bold">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ icon, label, to, active, collapsed }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold group
        ${active 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "text-gray-400 hover:text-white hover:bg-gray-800"
        } 
        ${collapsed ? "justify-center" : ""}`}
    >
      <span className={`text-2xl transition-transform ${active ? "" : "group-hover:scale-110"}`}>
        {icon}
      </span>
      {!collapsed && <span className="text-sm tracking-wide">{label}</span>}
      {!collapsed && active && (
        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
      )}
    </Link>
  );
}