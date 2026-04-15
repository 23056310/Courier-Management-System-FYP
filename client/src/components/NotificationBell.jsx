import React, { useState } from "react";
import { FaBell } from "react-icons/fa";

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Your parcel TRK123 has been shipped",
      time: "2 mins ago",
    },
    {
      id: 2,
      message: "Driver assigned for your delivery",
      time: "10 mins ago",
    },
    {
      id: 3,
      message: "Parcel delivered successfully",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="relative">

      {/* BELL ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <FaBell size={20} />

        {/* BADGE */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {notifications.length}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md border z-50">

          <div className="p-3 border-b font-semibold text-gray-700">
            Notifications
          </div>

          <div className="max-h-60 overflow-y-auto">

            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 hover:bg-gray-50 border-b"
              >
                <p className="text-sm text-gray-700">{n.message}</p>
                <p className="text-xs text-gray-400">{n.time}</p>
              </div>
            ))}

          </div>

          <div className="p-2 text-center text-blue-600 text-sm hover:bg-gray-50 cursor-pointer">
            View All
          </div>

        </div>
      )}

    </div>
  );
}

export default NotificationBell;