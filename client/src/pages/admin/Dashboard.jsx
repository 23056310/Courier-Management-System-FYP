import React from "react";
import { HiOutlineCube, HiOutlineUsers, HiOutlineTruck, HiOutlineChatAlt2, HiOutlinePlus, HiOutlinePresentationChartBar, HiOutlineChevronRight } from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* WELCOME SECTION */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">Admin Command Center</h1>
            <p className="text-gray-500 font-medium">Monitoring the pulse of our logistics network.</p>
          </div>

          {/* STATS GRID */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <StatCard 
              icon={<HiOutlineCube />} 
              label="Total Parcels" 
              value="1,245" 
              color="text-primary" 
              bg="bg-primary/5"
            />
            <StatCard 
              icon={<HiOutlineTruck />} 
              label="Active Drivers" 
              value="48" 
              color="text-green-600" 
              bg="bg-green-50"
            />
            <StatCard 
              icon={<HiOutlineUsers />} 
              label="Customers" 
              value="2,300" 
              color="text-purple-600" 
              bg="bg-purple-50"
            />
            <StatCard 
              icon={<HiOutlineChatAlt2 />} 
              label="Open Inquiries" 
              value="12" 
              color="text-red-500" 
              bg="bg-red-50"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* SYSTEM ACTIVITY */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 italic">Global System Activity</h2>
                <button className="text-primary text-sm font-bold hover:underline">Full Log</button>
              </div>

              <div className="space-y-6">
                <SystemLogItem 
                  type="parcel"
                  text="New parcel created by customer"
                  user="CMS-1001"
                  time="5 mins ago"
                />
                <SystemLogItem 
                  type="driver"
                  text="Driver assigned to shipment"
                  user="CMS-1002"
                  time="12 mins ago"
                />
                <SystemLogItem 
                  type="inquiry"
                  text="New support inquiry received"
                  user="Sara Wilson"
                  time="25 mins ago"
                />
                <SystemLogItem 
                  type="delivery"
                  text="Parcel delivered successfully"
                  user="CMS-1003"
                  time="1 hour ago"
                />
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
               <h2 className="text-xl font-bold text-gray-900 mb-8 italic text-center">Quick Operations</h2>
               <div className="space-y-4">
                  <QuickActionButton 
                    icon={<HiOutlinePlus />}
                    label="Create Parcel"
                    color="bg-primary shadow-primary/20"
                  />
                  <QuickActionButton 
                    icon={<HiOutlineUsers />}
                    label="Register Driver"
                    color="bg-green-600 shadow-green-200"
                  />
                  <QuickActionButton 
                    icon={<HiOutlinePresentationChartBar />}
                    label="Generate Reports"
                    color="bg-purple-600 shadow-purple-200"
                  />
               </div>
               
               <div className="mt-10 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">System Alerts</p>
                  <p className="text-sm text-red-500 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    3 Overdue deliveries detected
                  </p>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
    <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

const SystemLogItem = ({ type, text, user, time }) => {
  const icons = {
    parcel: <HiOutlineCube />,
    driver: <HiOutlineTruck />,
    inquiry: <HiOutlineChatAlt2 />,
    delivery: <HiOutlineCheckCircle />
  };
  
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-700">
          {text} <span className="text-primary italic">@{user}</span>
        </p>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{time}</p>
      </div>
      <HiOutlineChevronRight className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const QuickActionButton = ({ icon, label, color }) => (
  <button className={`w-full flex items-center gap-4 p-4 rounded-2xl text-white font-bold transition-all hover:-translate-y-1 shadow-lg ${color}`}>
    <span className="text-2xl">{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

export default Dashboard;