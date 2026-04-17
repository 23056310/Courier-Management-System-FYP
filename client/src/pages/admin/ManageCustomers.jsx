import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineDownload, HiOutlineDotsVertical, HiOutlineUserCircle, HiOutlineMail, HiOutlineTrash } from "react-icons/hi";
import { getAllUsers, deleteUser } from "../../services/authService";
import { toast } from "react-hot-toast";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllUsers();
      setCustomers(data.filter(u => u.role === "customer"));
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      try {
        await deleteUser(id);
        toast.success("Customer deleted successfully");
        setCustomers(customers.filter(c => c._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete customer");
      }
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <HiOutlineUserCircle className="text-6xl mb-4" />
                <p className="font-bold text-lg">{searchTerm ? "No results found" : "No customers found"}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50 bg-gray-50/50">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer Identity</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Joined Date</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[1.25rem] overflow-hidden border-2 border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-primary transition-all">
                               {customer.profilePic ? (
                                 <img src={customer.profilePic} alt={customer.name} className="w-full h-full object-cover" />
                               ) : (
                                 <HiOutlineUserCircle className="text-2xl" />
                               )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 group-hover:text-primary transition-colors italic uppercase tracking-tighter">{customer.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{customer.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2 text-xs font-bold text-gray-500 italic">
                              <HiOutlineMail className="text-primary text-sm" /> {customer.email}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                          <StatusBadge status="Active" />
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-3">
                             <button 
                              onClick={() => handleDelete(customer._id)}
                              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Customer"
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
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span className="px-4 py-1.5 rounded-full border bg-green-50 text-green-600 border-green-100 text-[10px] font-black uppercase tracking-widest">
    {status}
  </span>
);

export default ManageCustomers;

