import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical, HiOutlineChatAlt2, HiOutlineMail } from "react-icons/hi";

const ManageInquiries = () => {
  const inquiries = [
    {
      id: "INQ-4001",
      name: "John Doe",
      email: "john@example.com",
      message: "I want to know about international shipping rates for bulk items.",
      status: "Pending",
      date: "Apr 12, 2026"
    },
    {
      id: "INQ-4002",
      name: "Sarah Khan",
      email: "sarah@example.com",
      message: "My parcel TRK982 is delayed. Please check the current status.",
      status: "Replied",
      date: "Apr 14, 2026"
    },
    {
      id: "INQ-4003",
      name: "Ali Raza",
      email: "ali@example.com",
      message: "Do you offer same-day delivery in the Baneshwor area?",
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
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Customer Inquiries</h1>
               <p className="text-gray-500 font-medium">Review and respond to customer questions and feedback.</p>
            </div>
            <div className="flex gap-3">
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
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Inquiry Details</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Message Content</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Request Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map((inq, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                             <HiOutlineChatAlt2 />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors italic tracking-tighter">{inq.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1"><HiOutlineMail /> {inq.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-gray-500 font-medium max-w-xs leading-relaxed line-clamp-2">
                          {inq.message}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-gray-400 uppercase italic">
                        {inq.date}
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={inq.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2">
                           <button className="px-4 py-2 bg-gray-50 text-gray-900 text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-white transition-all">Reply</button>
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
  const styles = status === "Replied" 
    ? 'bg-green-50 text-green-600 border-green-100' 
    : 'bg-yellow-50 text-yellow-600 border-yellow-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  );
};

export default ManageInquiries;