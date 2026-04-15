import React, { useContext, useState, useRef, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext"; 
import { FaBell } from "react-icons/fa";

const NotificationBell = () => {
  const { notifications, markAsRead, deleteNotif } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      {/* Bell Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaBell className="text-2xl text-gray-700 hover:text-blue-600 transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50 rounded-t-lg">
            <span className="font-semibold text-gray-700">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={() =>
                  notifications.forEach((n) => !n.read && markAsRead(n._id))
                }
                className="text-xs text-blue-600 hover:underline"
              >
                Mark all
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">No notifications</div>
          ) : (
            <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200">
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={`flex justify-between items-center px-4 py-3 text-sm ${
                    n.read ? "bg-white" : "bg-blue-50"
                  } hover:bg-gray-100 transition`}
                >
                  <span className="text-gray-700">{n.message}</span>
                  <div className="flex gap-2">
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotif(n._id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
