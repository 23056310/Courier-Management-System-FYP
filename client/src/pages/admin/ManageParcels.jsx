import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical, HiOutlinePlus, HiOutlineTruck, HiOutlineUser, HiOutlineTag } from "react-icons/hi";

const ManageParcels = () => {
  const parcels = [
    {
      id: "CMS-1001",
      tracking: "TRK123456",
      customer: "John Doe",
      driver: "Ramesh Sharma",
      status: "Delivered",
      date: "Apr 15, 2026"
    },
    {
      id: "CMS-1002",
      tracking: "TRK789012",
      customer: "Sarah Khan",
      driver: "Sita Rai",
      status: "In Transit",
      date: "Apr 14, 2026"
    },
    {
      id: "CMS-1003",
      tracking: "TRK345678",
      customer: "Ali Raza",
      driver: "Not Assigned",
      status: "Pending",
      date: "Apr 15, 2026"
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
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Manage Parcels</h1>
               <p className="text-gray-500 font-medium">Monitor and manage all system-wide shipments and assignments.</p>
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-primary transition-all text-[10px] shadow-xl">
                 <HiOutlinePlus className="text-base" /> Create Parcel
               </button>
               <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                 <HiOutlineFilter /> Filter
               </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Parcel & Tracking</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Assigned Driver</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {parcels.map((parcel, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                             <HiOutlineTag />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tighter">{parcel.id}</p>
                            <p className="text-xs text-gray-400 font-medium uppercase">{parcel.tracking}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <HiOutlineUser className="text-gray-400" />
                           <span className="font-bold text-gray-700 text-sm italic">{parcel.customer}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm">
                        <div className="flex items-center gap-3 font-medium">
                           <HiOutlineTruck className="text-primary" />
                           <span className={parcel.driver === 'Not Assigned' ? 'text-red-400' : 'text-gray-600'}>{parcel.driver}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={parcel.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                           <button className="px-4 py-2 bg-gray-50 text-gray-900 text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-white transition-all">Assign</button>
                           <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900">
                             <HiOutlineDotsVertical />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center text-sm font-bold text-gray-500 italic">
               Monitor current delivery load and driver efficiency.
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

export default ManageParcels;