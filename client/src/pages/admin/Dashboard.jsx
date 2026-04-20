import React, { useEffect, useState } from "react";
import { HiOutlineCube, HiOutlineUsers, HiOutlineTruck, HiOutlineChatAlt2, HiOutlinePresentationChartBar } from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { getAdminDashboardStats } from "../../services/authService";
import { toast } from "react-hot-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getAdminDashboardStats();
      if (res.success) {
        setStats(res.stats);
        setAnalytics(res.analytics);
      }
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
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
          {/* WELCOME SECTION */}
          <div className="mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 italic uppercase tracking-tighter leading-tight">Admin Command Center</h1>
            <p className="text-gray-500 font-medium text-sm">Monitoring the pulse of our logistics network.</p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <StatCard icon={<HiOutlineCube />} label="Total Parcels" value={stats?.totalParcels || 0} color="text-primary" bg="bg-primary/5" />
            <StatCard icon={<HiOutlineTruck />} label="Active Drivers" value={stats?.totalDrivers || 0} color="text-green-600" bg="bg-green-50" />
            <StatCard icon={<HiOutlineUsers />} label="System Users" value={stats?.totalUsers || 0} color="text-purple-600" bg="bg-purple-50" />
            <StatCard icon={<HiOutlineChatAlt2 />} label="Open Inquiries" value={stats?.totalInquiries || 0} color="text-red-500" bg="bg-red-50" />
          </div>

          {/* ANALYTICS SECTION */}
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter">Logistics Flow Analysis</h2>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Daily Shipment Volume over the last 7 days</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Live Stream</span>
              </div>
            </div>

            <div className="h-[300px] sm:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient id="colorParcels" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff4b2b" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ff416c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} 
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="parcels" 
                    stroke="#ff4b2b" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorParcels)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <InsightMini icon={<HiOutlinePresentationChartBar />} label="Trend" value="Upward (+12%)" />
              <InsightMini icon={<HiOutlineTruck />} label="Fleet Efficiency" value="98.4%" />
              <InsightMini icon={<HiOutlineCube />} label="Peak Day" value={analytics.reduce((max, obj) => obj.parcels > max.parcels ? obj : max, analytics[0] || {name: 'N/A'}).name} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
  </div>
);

const InsightMini = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100">
    <div className="text-xl text-primary shrink-0">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-xs font-bold text-gray-900 italic">{value}</p>
    </div>
  </div>
);

export default Dashboard;