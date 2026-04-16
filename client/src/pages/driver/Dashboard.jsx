import React from "react";
import { HiOutlineMap, HiOutlineCheckCircle, HiOutlineClock, HiOutlineClipboardList, HiOutlineChevronRight } from "react-icons/hi";
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">Driver Dashboard</h1>
            <p className="text-gray-500 font-medium">Hello there! Ready for your deliveries today?</p>
          </div>

          {/* STATS GRID */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <StatCard 
              icon={<HiOutlineClipboardList />} 
              label="Assigned" 
              value="12" 
              color="text-primary" 
              bg="bg-primary/5"
            />
            <StatCard 
              icon={<HiOutlineCheckCircle />} 
              label="Completed" 
              value="145" 
              color="text-green-600" 
              bg="bg-green-50"
            />
            <StatCard 
              icon={<HiOutlineClock />} 
              label="In Queue" 
              value="4" 
              color="text-orange-500" 
              bg="bg-orange-50"
            />
            <StatCard 
              icon={<HiOutlineMap />} 
              label="Total KM" 
              value="2,450" 
              color="text-purple-600" 
              bg="bg-purple-50"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* CURRENT ASSIGNMENTS */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 italic">Active Assignments</h2>
                <button className="text-primary text-sm font-bold hover:underline">View Schedule</button>
              </div>

              <div className="space-y-6">
                <AssignmentItem 
                  id="CMS-7890"
                  location="Baneshwor -> Patan"
                  priority="High"
                  time="ETA: 30 mins"
                />
                <AssignmentItem 
                  id="CMS-7891"
                  location="Koteshwor -> Bhaktapur"
                  priority="Normal"
                  time="ETA: 1.5 hours"
                />
                <AssignmentItem 
                  id="CMS-7892"
                  location="Chabahil -> Boudha"
                  priority="Urgent"
                  time="ETA: 15 mins"
                />
              </div>
            </div>

            {/* DRIVER RANKING / STATS */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-gradient-to-tr from-primary to-blue-400 rounded-3xl flex items-center justify-center text-white text-4xl font-black mb-6 shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
                 <HiOutlineCheckCircle />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2 italic">Excellent Performance</h3>
               <p className="text-sm text-gray-500 leading-relaxed mb-8">You've completed 98% of deliveries on time this month. Keep it up!</p>
               <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
                  <div className="w-[98%] h-full bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
               </div>
               <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all">
                 View Detailed Analytics
               </button>
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

const AssignmentItem = ({ id, location, priority, time }) => (
  <div className="flex items-center gap-6 p-5 rounded-2xl border border-gray-50 hover:border-primary/20 hover:bg-primary/5 transition-all group">
    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
      <HiOutlineMap className="text-xl" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-black text-gray-900 text-sm">{id}</span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
          priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {priority}
        </span>
      </div>
      <p className="text-xs text-gray-500 font-bold">{location}</p>
    </div>
    <div className="text-right">
      <p className="text-xs font-black text-primary uppercase mb-1">{time}</p>
      <button className="text-[10px] font-black underline underline-offset-2 hover:text-primary transition-colors">START TRIP</button>
    </div>
  </div>
);

export default Dashboard;