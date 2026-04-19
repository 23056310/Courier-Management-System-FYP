import React, { useEffect } from "react";
import { 
  HiOutlineBell, HiOutlineClock, HiOutlineCheckCircle, 
  HiOutlineTruck, HiOutlineTrash, HiOutlineMailOpen,
  HiOutlineRefresh
} from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useNotifications } from "../../context/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const Notifications = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    fetchNotifications 
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

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
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter mb-2">
                  Notification Center
                </h1>
                <p className="text-gray-500 font-medium">
                  You have <span className="text-primary font-bold">{unreadCount} unread</span> alerts in your feed.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={fetchNotifications}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm"
                >
                  <HiOutlineRefresh /> Refresh
                </button>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 transition-all shadow-lg"
                  >
                    <HiOutlineMailOpen /> Mark All Read
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              {notifications.length === 0 ? (
                <div className="py-32 text-center">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HiOutlineBell className="text-gray-300 text-4xl" />
                  </div>
                  <p className="text-gray-400 font-black uppercase tracking-widest italic">All clear! No notifications found.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {notifications.map((n, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={n._id}
                      className={`p-8 hover:bg-gray-50/50 transition-all group relative flex gap-6 ${
                        !n.read ? "bg-primary/[0.02]" : "bg-white"
                      }`}
                    >
                      {!n.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                      
                      <div className={`w-14 h-14 ${getBg(n.type)} rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                        {getIcon(n.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className={`text-lg font-bold text-gray-900 italic ${!n.read && "text-primary"}`}>
                              {n.parcelId?.trackingNumber ? `Parcel #${n.parcelId.trackingNumber}` : "System Notification"}
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                              {n.type.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                            {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 font-medium leading-relaxed max-w-2xl">
                          {n.message}
                        </p>

                        <div className="mt-6 flex items-center gap-6">
                          {!n.read && (
                            <button 
                              onClick={() => markAsRead(n._id)}
                              className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:underline flex items-center gap-2"
                            >
                              <HiOutlineCheckCircle /> Mark as Read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(n._id)}
                            className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 hover:underline flex items-center gap-2"
                          >
                            <HiOutlineTrash /> Remove Alert
                          </button>
                        </div>
                      </div>

                      {!n.read && (
                        <div className="absolute top-8 right-8 w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
