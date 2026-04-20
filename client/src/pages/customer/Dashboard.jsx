import React, { useEffect, useState } from "react";
import { HiOutlineCube, HiOutlineCheckCircle, HiOutlineTruck, HiOutlineClock, HiOutlineChevronRight, HiOutlinePresentationChartBar } from "react-icons/hi";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getCustomerDashboardStats } from "../../services/parcelService";
import { toast } from "react-hot-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getCustomerDashboardStats();
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
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase leading-tight">Shipment Overview</h1>
            <p className="text-gray-500 font-medium italic text-sm">Your logistical footprint, synchronized and simplified.</p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <StatCard icon={<HiOutlineCube />} label="Total Shipments" value={stats?.total || 0} color="text-primary" bg="bg-primary/5" />
            <StatCard icon={<HiOutlineCheckCircle />} label="Delivered" value={stats?.delivered || 0} color="text-green-600" bg="bg-green-50" />
            <StatCard icon={<HiOutlineTruck />} label="Moving Now" value={stats?.inTransit || 0} color="text-orange-500" bg="bg-orange-50" />
            <StatCard icon={<HiOutlineClock />} label="Processing" value={stats?.pending || 0} color="text-blue-500" bg="bg-blue-50" />
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* ANALYTICS SECTION */}
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter">Your Shipping Activity</h2>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Bookings over the last 7 days</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Real-Time Sync</span>
                </div>
              </div>

              <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff4b2b" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ff416c" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                    <Tooltip contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                    <Area type="monotone" dataKey="bookings" stroke="#ff4b2b" strokeWidth={4} fillOpacity={1} fill="url(#colorBookings)" animationDuration={2000} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
  </div>
);