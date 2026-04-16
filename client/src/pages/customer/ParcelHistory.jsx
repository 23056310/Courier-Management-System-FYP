import React from "react";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical } from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const ParcelHistory = () => {
  // Dummy data (frontend simulation)
  const parcels = [
    {
      id: "CMS-10042",
      tracking: "TRK982341",
      receiver: "John Smith",
      status: "Delivered",
      date: "Apr 12, 2026",
      amount: "24.99"
    },
    {
      id: "CMS-10039",
      tracking: "TRK772345",
      receiver: "Sarah Wilson",
      status: "In Transit",
      date: "Apr 14, 2026",
      amount: "18.50"
    },
    {
      id: "CMS-10035",
      tracking: "TRK112233",
      receiver: "Mike Ross",
      status: "Pending",
      date: "Apr 15, 2026",
      amount: "45.00"
    },
    {
      id: "CMS-10042",
      tracking: "TRK982341",
      receiver: "John Smith",
      status: "Delivered",
      date: "Apr 12, 2026",
      amount: "24.99"
    },
    {
      id: "CMS-10039",
      tracking: "TRK772345",
      receiver: "Sarah Wilson",
      status: "In Transit",
      date: "Apr 14, 2026",
      amount: "18.50"
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">Parcel History</h1>
              <p className="text-gray-500 font-medium">Track and manage all your past and present shipments.</p>
            </div>
            
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                 <HiOutlineFilter /> Filter
               </button>
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                 <HiOutlineDownload /> Export CSV
               </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Parcel Details</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Receiver</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date & Cost</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {parcels.map((parcel, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                             <HiOutlineSearch />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{parcel.id}</p>
                            <p className="text-xs text-gray-400 font-medium">Ref: {parcel.tracking}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-gray-700 text-sm">{parcel.receiver}</span>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={parcel.status} />
                      </td>
                      <td className="px-8 py-6">
                         <div>
                            <p className="font-bold text-gray-900 text-sm">{parcel.date}</p>
                            <p className="text-xs text-primary font-black uppercase tracking-tighter mt-1">${parcel.amount}</p>
                         </div>
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

            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
               <p className="text-sm text-gray-500 font-medium text-center sm:text-left">Showing 1 to 5 of 24 results</p>
               <div className="flex gap-2">
                 <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
                 <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-primary hover:bg-gray-50 shadow-sm transition-all">Next</button>
               </div>
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

export default ParcelHistory;