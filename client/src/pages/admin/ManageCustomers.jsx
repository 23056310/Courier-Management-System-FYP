import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical, HiOutlineUserCircle, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const ManageCustomers = () => {
  const customers = [
    {
      id: "CUS-2001",
      name: "John Doe",
      email: "john.doe@enterprise.com",
      phone: "+977 9800000001",
      status: "Active",
      joined: "Jan 12, 2026"
    },
    {
      id: "CUS-2002",
      name: "Sarah Khan",
      email: "sarah.k@logistics.com",
      phone: "+977 9800000002",
      status: "Inactive",
      joined: "Feb 01, 2026"
    },
    {
      id: "CUS-2003",
      name: "Ali Raza",
      email: "ali.raza@tech.com",
      phone: "+977 9800000003",
      status: "Active",
      joined: "Mar 15, 2026"
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
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Customer Directory</h1>
               <p className="text-gray-500 font-medium">Manage your global customer base and account status.</p>
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
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer Identity</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Details</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Join Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {customers.map((customer, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-[1.25rem] flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all text-2xl">
                             <HiOutlineUserCircle />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors italic uppercase tracking-tighter">{customer.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                              <HiOutlineMail className="text-primary text-sm" /> {customer.email}
                           </div>
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                              <HiOutlinePhone className="text-primary text-sm" /> {customer.phone}
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-400 italic">
                        {customer.joined}
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={customer.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                           <button className="px-4 py-2 bg-gray-50 text-gray-900 text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-white transition-all">Profile</button>
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
  const styles = status === "Active" 
    ? 'bg-green-50 text-green-600 border-green-100' 
    : 'bg-red-50 text-red-600 border-red-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  );
};

export default ManageCustomers;