import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineChartBar, HiOutlineTrendingUp, HiOutlineCurrencyDollar, HiOutlineCube, HiOutlineTruck, HiOutlineThumbUp, HiOutlineDownload } from "react-icons/hi";

const Reports = () => {
  const reportData = {
    totalParcels: "1,245",
    delivered: "980",
    inTransit: "180",
    pending: "85",
    revenue: "$45,200",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Analytics Hub</h1>
               <p className="text-gray-500 font-medium">Strategic insights and real-time performance metrics.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary transition-all shadow-xl">
               <HiOutlineDownload className="text-base" /> Export Full Report
            </button>
          </div>

          {/* STATS GRID */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <ReportStat 
               icon={<HiOutlineCube />} 
               label="Total Volume" 
               value={reportData.totalParcels} 
               color="text-primary" 
               bg="bg-primary/5" 
            />
            <ReportStat 
               icon={<HiOutlineCurrencyDollar />} 
               label="Gross Revenue" 
               value={reportData.revenue} 
               color="text-green-600" 
               bg="bg-green-50" 
            />
            <ReportStat 
               icon={<HiOutlineTrendingUp />} 
               label="Growth Rate" 
               value="+12.5%" 
               color="text-orange-500" 
               bg="bg-orange-50" 
            />
            <ReportStat 
               icon={<HiOutlineThumbUp />} 
               label="CSAT Score" 
               value="4.8/5" 
               color="text-purple-600" 
               bg="bg-purple-50" 
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
             {/* PERFORMANCE CHART SIMULATION */}
             <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 mb-8 italic flex items-center gap-3">
                   <HiOutlineChartBar className="text-primary" /> Delivery Performance
                </h3>
                
                <div className="space-y-8">
                  <PerformanceBar label="Delivered" raw="980" percentage="80" color="bg-green-500" />
                  <PerformanceBar label="In Transit" raw="180" percentage="15" color="bg-primary" />
                  <PerformanceBar label="Pending" raw="85" percentage="5" color="bg-red-500" />
                </div>

                <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                      "Current delivery efficiency is at an all-time high of 92.4% across urban zones."
                   </p>
                </div>
             </div>

             {/* KEY INSIGHTS */}
             <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <h3 className="text-xl font-bold mb-8 italic tracking-widest uppercase">Strategic Insights</h3>
                <div className="space-y-6">
                   <InsightItem icon={<HiOutlineTrendingUp className="text-green-400" />} text="Revenue increased by 15% due to new international partner hubs." />
                   <InsightItem icon={<HiOutlineTruck className="text-blue-400" />} text="Average delivery time reduced by 14 minutes in the last 30 days." />
                   <InsightItem icon={<HiOutlineCube className="text-orange-400" />} text="Highest shipping volume detected from Nepal-China export corridor." />
                   <InsightItem icon={<HiOutlineThumbUp className="text-purple-400" />} text="Customer lifetime value (CLV) improved by 8% through loyalty rewards." />
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const ReportStat = ({ icon, label, value, color, bg }) => (
  <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
    <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black italic tracking-tighter ${color}`}>{value}</p>
  </div>
);

const PerformanceBar = ({ label, raw, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
       <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</span>
       <span className="text-sm font-black text-gray-900 italic tracking-tighter">{percentage}% <span className="text-[10px] font-medium text-gray-400 ml-1">({raw})</span></span>
    </div>
    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
       <div className={`${color} h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const InsightItem = ({ icon, text }) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
     <div className="text-xl shrink-0 mt-0.5 group-hover:scale-125 transition-transform">{icon}</div>
     <p className="text-xs text-white/70 font-medium leading-relaxed italic">{text}</p>
  </div>
);

export default Reports;