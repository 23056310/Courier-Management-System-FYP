import React, { useState, useRef, useEffect } from "react";
import { 
  HiOutlineBell, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineTruck, 
  HiOutlineChevronRight, 
  HiOutlineTrash, 
  HiOutlineMailOpen 
} from "react-icons/hi";
import { useNotifications } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'ParcelCreated': return <HiOutlineClock className="text-orange-500" />;
      case 'ParcelStatusUpdate': return <HiOutlineTruck className="text-primary" />;
      case 'DriverAssigned': return <HiOutlineCheckCircle className="text-green-500" />;
      case 'DriverRegistered': return <HiOutlineClock className="text-blue-500" />;
      case 'DriverStatusUpdate': return <HiOutlineCheckCircle className="text-indigo-500" />;
      default: return <HiOutlineBell className="text-gray-500" />;
    }
  };

  const getBg = (type) => {
    switch (type) {
      case 'ParcelCreated': return "bg-orange-50";
      case 'ParcelStatusUpdate': return "bg-primary/5";
      case 'DriverAssigned': return "bg-green-50";
      case 'DriverRegistered': return "bg-blue-50";
      case 'DriverStatusUpdate': return "bg-indigo-50";
      default: return "bg-gray-50";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`relative p-3 rounded-2xl transition-all duration-300 ${
          open 
            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
        }`}
      >
        <HiOutlineBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute right-0 mt-4 w-96 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] border border-gray-100 z-50 overflow-hidden"
          >
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-black text-gray-900 italic tracking-tighter uppercase text-xl">Notifications</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  You have {unreadCount} unread messages
                </p>
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={() => markAllAsRead()}
                    className="p-2 hover:bg-primary/10 text-primary rounded-xl transition-colors"
                    title="Mark all as read"
                  >
                    <HiOutlineMailOpen size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[450px] overflow-y-auto p-4 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineBell className="text-gray-300" size={30} />
                  </div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.slice(0, 2).map((n) => (
                    <div
                      key={n._id}
                      className={`p-4 rounded-[1.5rem] transition-all group relative border ${
                        n.read ? "bg-white border-transparent" : "bg-primary/5 border-primary/10"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 ${getBg(n.type)} rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform`}>
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-bold text-gray-900 text-sm truncate ${!n.read && "pr-2"}`}>
                              {n.parcelId?.trackingNumber ? `Parcel ${n.parcelId.trackingNumber}` : "System Update"}
                            </h4>
                            <span className="text-[10px] font-bold text-gray-400 shrink-0">
                              {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">{n.message}</p>
                          
                          <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!n.read && (
                              <button 
                                onClick={() => markAsRead(n._id)}
                                className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button 
                              onClick={() => deleteNotification(n._id)}
                              className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline flex items-center gap-1"
                            >
                              <HiOutlineTrash size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      {!n.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => { setOpen(false); navigate("/notifications"); }}
              className="w-full p-6 text-center text-primary font-black uppercase tracking-widest text-[11px] hover:bg-gray-50 border-t border-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              View All Notifications <HiOutlineChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;