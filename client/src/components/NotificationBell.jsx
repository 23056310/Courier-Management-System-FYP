import React, { useState } from "react";
import { HiOutlineBell, HiOutlineClock, HiOutlineCheckCircle, HiOutlineTruck, HiOutlineChevronRight } from "react-icons/hi";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      icon: <HiOutlineTruck className="text-primary" />,
      bg: "bg-primary/5",
      title: "Parcel CMS-123",
      message: "Dispatched from Kathmandu hub.",
      time: "2 mins ago",
    },
    {
      id: 2,
      icon: <HiOutlineCheckCircle className="text-green-500" />,
      bg: "bg-green-50",
      title: "Delivery Success",
      message: "Your parcel has been delivered.",
      time: "10 mins ago",
    },
    {
      id: 3,
      icon: <HiOutlineClock className="text-orange-500" />,
      bg: "bg-orange-50",
      title: "New Assignment",
      message: "Driver assigned to your order.",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`relative p-3 rounded-2xl transition-all ${
          open ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
        }`}
      >
        <HiOutlineBell size={22} />
        {notifications.length > 0 && (
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-96 bg-white shadow-2xl shadow-gray-200/50 rounded-[2.5rem] border border-gray-100 z-50 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-black text-gray-900 italic tracking-tighter uppercase">Notifications</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">{notifications.length} New</span>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 hover:bg-gray-50 rounded-[1.5rem] transition-colors group cursor-pointer flex gap-4"
              >
                <div className={`w-12 h-12 ${n.bg} rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform`}>
                  {n.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{n.title}</h4>
                    <span className="text-[10px] font-bold text-gray-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full p-6 text-center text-primary font-black uppercase tracking-widest text-[11px] hover:bg-gray-50 border-t border-gray-50 transition-colors flex items-center justify-center gap-2">
            View All Notifications <HiOutlineChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;