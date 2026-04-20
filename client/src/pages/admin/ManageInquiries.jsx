import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineChatAlt2, HiOutlineMail, HiOutlineTrash, HiOutlinePaperAirplane, HiOutlineUserCircle, HiOutlinePhone } from "react-icons/hi";
import { getAllInquiries, deleteInquiry, respondToInquiry } from "../../services/inquiryService";
import { toast } from "react-hot-toast";

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-gray-900">{value}</p>
  </div>
);

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries();
      setInquiries(data);
    } catch (error) {
      toast.error("Failed to fetch inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteInquiry(id);
        toast.success("Inquiry deleted");
        setInquiries(inquiries.filter(i => i._id !== id));
      } catch (error) {
        toast.error("Failed to delete inquiry");
      }
    }
  };

  const handleReply = async () => {
    if (!replyMessage) return toast.error("Please enter a response");
    try {
      await respondToInquiry(replyingTo._id, replyMessage);
      toast.success("Response sent successfully");
      fetchInquiries();
      setReplyingTo(null);
      setReplyMessage("");
    } catch (error) {
      toast.error("Failed to send response");
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 gap-6">
            <div>
               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase leading-tight">Customer Inquiries</h1>
               <p className="text-gray-500 font-medium text-sm">Review and respond to customer questions and feedback.</p>
            </div>
            <div className="w-full md:w-80">
               <div className="relative group">
                 <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                 <input 
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm shadow-sm"
                 />
               </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
             {loading ? (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 p-8 text-center">
                  <HiOutlineChatAlt2 className="text-6xl mb-4" />
                  <p className="font-bold text-lg">{searchTerm ? "No matches found" : "No inquiries yet"}</p>
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left min-w-[1000px]">
                    <thead>
                      <tr className="border-b border-gray-50 bg-gray-50/50">
                        <th className="px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Inquiry Details</th>
                        <th className="px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Message Content</th>
                        <th className="px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Request Date</th>
                        <th className="px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                        <th className="px-6 sm:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq._id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                 <HiOutlineChatAlt2 />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors italic tracking-tighter uppercase">{inq.name}</p>
                                <div className="text-[10px] text-gray-400 font-bold flex flex-col gap-0.5 mt-1">
                                   <span className="flex items-center gap-1 uppercase tracking-wider"><HiOutlineMail className="text-primary text-[10px]" /> {inq.email}</span>
                                   <span className="flex items-center gap-1 uppercase tracking-wider"><HiOutlinePhone className="text-primary text-[10px]" /> {inq.phone || "N/A"}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="max-w-xs">
                              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 italic">{inq.subject}</p>
                              <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2" title={inq.message}>
                                {inq.message}
                              </p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                               {inq.createdAt ? (
                                 <>
                                   <div>{new Date(inq.createdAt).toLocaleDateString()}</div>
                                   <div className="text-[9px] text-primary/60 mt-0.5 italic">{new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                 </>
                               ) : "Pending Sync"}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <StatusBadge status={inq.status} />
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-2">
                               <button 
                                onClick={() => setReplyingTo(inq)}
                                className="px-4 py-2 bg-gray-50 text-gray-900 text-[10px] font-black uppercase rounded-xl hover:bg-primary hover:text-white transition-all"
                               >
                                  {inq.status === "Pending" ? "Reply" : "View"}
                               </button>
                               <button 
                                onClick={() => handleDelete(inq._id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                               >
                                 <HiOutlineTrash className="text-xl" />
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </main>
      </div>

      {/* REPLY MODAL */}
      {replyingTo && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-black text-gray-900 italic uppercase">{replyingTo.status === "Pending" ? "Reply to Inquiry" : "Inquiry Details"}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">To: {replyingTo.email}</p>
              </div>
              <button onClick={() => setReplyingTo(null)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <HiOutlineChatAlt2 className="text-2xl" />
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Full Name" value={replyingTo.name} />
                  <DetailItem label="Phone Number" value={replyingTo.phone || "Not Provided"} />
                </div>
                <DetailItem label="Subject Reference" value={replyingTo.subject} />
                
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 italic">Customer's Primary Message:</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">"{replyingTo.message}"</p>
                </div>

                {replyingTo.status === "Responded" ? (
                  <div className="p-6 bg-green-50/50 rounded-[2rem] border border-green-100">
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-3 italic">Sent Response:</p>
                    <p className="text-sm text-gray-700 leading-relaxed font-bold">"{replyingTo.responseMessage}"</p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Compose Reply</label>
                    <textarea 
                      rows="5"
                      className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-[2rem] focus:outline-none focus:border-primary/20 focus:bg-white transition-all font-medium text-sm resize-none shadow-inner"
                      placeholder="Type your reply here..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <button 
                onClick={() => setReplyingTo(null)}
                className="flex-1 py-4 font-black text-gray-400 uppercase tracking-widest text-[10px] hover:text-gray-900 transition-colors"
              >
                Close Window
              </button>
              {replyingTo.status === "Pending" && (
                <button 
                  onClick={handleReply}
                  className="flex-[2] py-4 bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-primary transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <HiOutlinePaperAirplane className="rotate-90" /> Send Response
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = status === "Responded" 
    ? 'bg-green-50 text-green-600 border-green-100' 
    : 'bg-yellow-50 text-yellow-600 border-yellow-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  );
};

export default ManageInquiries;