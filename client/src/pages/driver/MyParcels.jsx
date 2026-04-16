import React from "react";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical, HiOutlineMap } from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const MyParcels = () => {
  // Dummy data (frontend simulation)
  const parcels = [
    {
      id: "CMS-7890",
      tracking: "TRK123456",
      receiver: "John Doe",
      status: "Delivered",
      date: "2026-04-10",
      location: "Baneshwor -> Patan"
    },
    {
      id: "CMS-7891",
      tracking: "TRK789012",
      receiver: "Sarah Khan",
      status: "In Transit",
      date: "2026-04-12",
      location: "Koteshwor -> Bhaktapur"
    },
    {
      id: "CMS-7892",
      tracking: "TRK345678",
      receiver: "Ali Raza",
      status: "Pending",
      date: "2026-04-14",
      location: "Chabahil -> Boudha"
    },
    {
      id: "CMS-7893",
      tracking: "TRK556677",
      receiver: "Emma Stone",
      status: "In Transit",
      date: "2026-04-15",
      location: "Kalanki -> Thankot"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">My Delivery Tasks</h1>
              <p className="text-gray-500 font-medium">Manage and track your assigned delivery parcels.</p>
            </div>
            
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                 <HiOutlineFilter /> Filter
               </button>
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                 <HiOutlineDownload /> Export
               </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Parcel ID</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Route</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Receiver</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {parcels.map((parcel, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                             <HiOutlineMap />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{parcel.id}</p>
                            <p className="text-xs text-gray-400 font-medium">{parcel.tracking}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-gray-700 text-sm">{parcel.location}</span>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                        {parcel.receiver}
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={parcel.status} />
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">
                        {parcel.date}
                      </td>
                      <td className="px-8 py-6 text-right">
                         <button className="p-2 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-gray-900">
                           <HiOutlineDotsVertical />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center text-sm font-bold text-gray-500 italic">
               Showing {parcels.length} active tasks.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Delivered': 'bg-green-50 text-green-600 border-green-100',
    'In Transit': 'bg-orange-50 text-orange-600 border-orange-100',
    'Pending': 'bg-red-50 text-red-600 border-red-100'
  }[status] || 'bg-gray-50 text-gray-600 border-gray-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  );
};

export default MyParcels;