import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical, HiOutlineTruck, HiOutlineMail, HiOutlinePhone, HiOutlineCube } from "react-icons/hi";

const ManageDrivers = () => {
  const drivers = [
    {
      id: "DRV-3001",
      name: "Ramesh Sharma",
      email: "r.sharma@courierms.com",
      phone: "+977 9800000011",
      status: "Active",
      parcels: 5,
    },
    {
      id: "DRV-3002",
      name: "Sita Rai",
      email: "sita.rai@courierms.com",
      phone: "+977 9800000012",
      status: "Busy",
      parcels: 12,
    },
    {
      id: "DRV-3003",
      name: "Amit Kumar",
      email: "amit.k@courierms.com",
      phone: "+977 9800000013",
      status: "Inactive",
      parcels: 0,
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
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Fleet Management</h1>
               <p className="text-gray-500 font-medium">Manage your delivery personnel and track their active workloads.</p>
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
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Driver Identity</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Active Load</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {drivers.map((driver, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-[1.25rem] flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all text-2xl">
                             <HiOutlineTruck />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors italic uppercase tracking-tighter">{driver.name}</p>
                            <p className="text-xs text-gray-400 font-medium uppercase font-black">{driver.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col gap-1 text-xs font-bold text-gray-500">
                           <span className="flex items-center gap-2"><HiOutlineMail className="text-primary" /> {driver.email}</span>
                           <span className="flex items-center gap-2"><HiOutlinePhone className="text-primary" /> {driver.phone}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                            <span className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary text-xs font-black italic">{driver.parcels}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Parcels</span>
                         </div>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={driver.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                           <button className="px-4 py-2 bg-gray-50 text-gray-900 text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-white transition-all">Details</button>
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
          </div>
        </main>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-green-50 text-green-600 border-green-100',
    'Busy': 'bg-orange-50 text-orange-600 border-orange-100',
    'Inactive': 'bg-red-50 text-red-600 border-red-100'
  }[status] || 'bg-gray-50 text-gray-600 border-gray-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  );
};

export default ManageDrivers;