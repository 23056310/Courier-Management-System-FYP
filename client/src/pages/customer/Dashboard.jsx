import React from "react";
import { HiOutlineCube, HiOutlineCheckCircle, HiOutlineTruck, HiOutlineClock, HiOutlineChevronRight } from "react-icons/hi";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* WELCOME SECTION */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">Dashboard Overview</h1>
            <p className="text-gray-500 font-medium">Welcome back! Here's what's happening with your shipments today.</p>
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
              icon={<HiOutlineCheckCircle />} 
              label="Delivered" 
              value="980" 
              color="text-green-600" 
              bg="bg-green-50"
            />
            <StatCard 
              icon={<HiOutlineTruck />} 
              label="In Transit" 
              value="210" 
              color="text-orange-500" 
              bg="bg-orange-50"
            />
            <StatCard 
              icon={<HiOutlineClock />} 
              label="Pending" 
              value="55" 
              color="text-red-500" 
              bg="bg-red-50"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* RECENT ACTIVITY */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 italic">Recent Activity</h2>
                <button className="text-primary text-sm font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-6">
                <ActivityItem 
                  icon={<HiOutlineTruck />} 
                  title="Parcel CMS123456 dispatched from Kathmandu" 
                  time="2 hours ago" 
                  status="transit"
                />
                <ActivityItem 
                  icon={<HiOutlineCheckCircle />} 
                  title="Parcel CMS987654 delivered successfully" 
                  time="5 hours ago" 
                  status="delivered"
                />
                <ActivityItem 
                  icon={<HiOutlineCube />} 
                  title="New parcel CMS345678 booked for Pokhara" 
                  time="Yesterday" 
                  status="booked"
                />
                <ActivityItem 
                  icon={<HiOutlineTruck />} 
                  title="Driver assigned to shipment CMS789012" 
                  time="Yesterday" 
                  status="assigned"
                />
              </div>
            </div>

            {/* QUICK ACTIONS / SIDE INFO */}
            <div className="space-y-8">
              <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-4 italic">Need to ship?</h3>
                   <p className="text-primary-100 text-sm mb-6 opacity-80 leading-relaxed">Book a new parcel in less than 2 minutes with our streamlined process.</p>
                   <button className="w-full py-4 bg-white text-primary font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                     Book Parcel <HiOutlineChevronRight />
                   </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-6 italic text-lg">Support Center</h3>
                 <p className="text-sm text-gray-500 mb-6 leading-relaxed">Having issues with a delivery or need to report a delay?</p>
                 <button className="w-full py-4 border-2 border-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-all">
                   Contact Support
                 </button>
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

const ActivityItem = ({ icon, title, time, status }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
      status === 'delivered' ? 'bg-green-50 text-green-600' : 
      status === 'transit' ? 'bg-primary/5 text-primary' : 'bg-gray-100 text-gray-500'
    }`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-xs text-gray-400 font-medium mt-1">{time}</p>
    </div>
    <HiOutlineChevronRight className="text-gray-300 group-hover:text-gray-400" />
  </div>
);

export default Dashboard;