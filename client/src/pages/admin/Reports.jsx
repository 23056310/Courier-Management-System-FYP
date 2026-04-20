import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineChartBar, HiOutlineTrendingUp, HiOutlineCurrencyDollar, HiOutlineCube, HiOutlineTruck, HiOutlineThumbUp, HiOutlineDownload } from "react-icons/hi";
import { getAdminDashboardStats } from "../../services/authService";
import { getAllParcels } from "../../services/parcelService";
import { toast } from "react-hot-toast";

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getAdminDashboardStats();
      if (res.success) {
        setStats(res.stats);
      }
    } catch (err) {
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const res = await getAllParcels();
      if (res.success && res.data) {
        const data = res.data.map(p => ({
          TrackingNumber: p.trackingNumber,
          Sender: p.sender.name,
          Recipient: p.recipient.name,
          Status: p.status,
          Weight: p.parcelDetails.weight,
          Type: p.parcelDetails.type,
          Date: new Date(p.createdAt).toLocaleDateString()
        }));

        const headers = Object.keys(data[0]).join(",");
        const csv = [headers, ...data.map(row => Object.values(row).join(","))].join("\n");
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `Courier_System_Report_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast.success("Log Report Exported Successfully");
      }
    } catch (err) {
      toast.error("Failed to export report");
    } finally {
      setExporting(false);
    }
  };

  const calculatePercentage = (count) => {
    if (!stats || stats.totalParcels === 0) return 0;
    return ((count / stats.totalParcels) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen">
          <Topbar />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 gap-6">
            <div>
               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase leading-tight">Analytics Hub</h1>
               <p className="text-gray-500 font-medium text-sm">Strategic insights and real-time performance metrics.</p>
            </div>
            <button 
              onClick={handleExport}
              disabled={exporting}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary transition-all shadow-xl disabled:opacity-50"
            >
               {exporting ? (
                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
               ) : (
                 <HiOutlineDownload className="text-base" />
               )}
               {exporting ? "Generating..." : "Export Full Report"}
            </button>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <ReportStat 
               icon={<HiOutlineCube />} 
               label="Total Volume" 
               value={stats?.totalParcels || 0} 
               color="text-primary" 
               bg="bg-primary/5" 
            />
            <ReportStat 
               icon={<HiOutlineTrendingUp />} 
               label="Growth Rate" 
               value="+0.0%" 
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10">
             {/* PERFORMANCE CHART SIMULATION */}
             <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 mb-8 italic flex items-center gap-3">
                   <HiOutlineChartBar className="text-primary" /> Delivery Performance
                </h3>
                
                <div className="space-y-8">
                  <PerformanceBar label="Delivered" raw={stats?.deliveredCount || 0} percentage={calculatePercentage(stats?.deliveredCount)} color="bg-green-500" />
                  <PerformanceBar label="In Transit" raw={stats?.inTransitCount || 0} percentage={calculatePercentage(stats?.inTransitCount)} color="bg-primary" />
                  <PerformanceBar label="Pending" raw={stats?.pendingCount || 0} percentage={calculatePercentage(stats?.pendingCount)} color="bg-red-500" />
                </div>

                <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                   <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                      "Real-time delivery health indicates {calculatePercentage(stats?.deliveredCount)}% completion rate across all zones."
                   </p>
                </div>
             </div>

             {/* KEY INSIGHTS */}
             <div className="bg-gray-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 text-white relative overflow-hidden">
                <h3 className="text-xl font-bold mb-8 italic tracking-widest uppercase">Strategic Insights</h3>
                <div className="space-y-6">
                   <InsightItem icon={<HiOutlineTrendingUp className="text-green-400" />} text={`Platform currently hosting ${stats?.totalUsers || 0} registered identities.`} />
                   <InsightItem icon={<HiOutlineTruck className="text-blue-400" />} text={`${stats?.totalDrivers || 0} active fleet members currently synchronized.`} />
                   <InsightItem icon={<HiOutlineCube className="text-orange-400" />} text={`${stats?.totalInquiries || 0} new customer inquiries awaiting administrative clearance.`} />
                   <InsightItem icon={<HiOutlineThumbUp className="text-purple-400" />} text="System stability optimized for high-volume FYP presentation performance." />
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