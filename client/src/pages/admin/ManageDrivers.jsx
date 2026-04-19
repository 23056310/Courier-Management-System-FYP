import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSearch, HiOutlineTruck, HiOutlineMail, HiOutlineTrash, HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { getAllUsers, deleteUser, updateUserRole } from "../../services/authService";
import { toast } from "react-hot-toast";

const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const data = await getAllUsers();
      setDrivers(data.filter(u => u.role === "driver"));
    } catch (error) {
      toast.error("Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    try {
      await updateUserRole(id, { 
        driverStatus: status, 
        isVerified: status === "Active" 
      });
      toast.success(`Driver ${status === "Active" ? "Approved" : "Rejected"}`);
      fetchDrivers();
    } catch (error) {
      toast.error("Process failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        await deleteUser(id);
        toast.success("Driver deleted successfully");
        setDrivers(drivers.filter(d => d._id !== id));
      } catch (error) {
        toast.error("Failed to delete driver");
      }
    }
  };

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              ) : filteredDrivers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                  <HiOutlineTruck className="text-6xl mb-4" />
                  <p className="font-bold text-lg">{searchTerm ? "No results found" : "No drivers found in fleet"}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-50 bg-gray-50/50">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Driver Identity</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Details</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Joined Date</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Verification Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredDrivers.map((driver) => (
                        <tr key={driver._id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-primary transition-all">
                                 {driver.profilePic ? (
                                   <img src={driver.profilePic} alt={driver.name} className="w-full h-full object-cover" />
                                 ) : (
                                   <HiOutlineTruck className="text-2xl" />
                                 )}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors italic uppercase tracking-tighter">{driver.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{driver.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-500 italic">
                                <HiOutlineMail className="text-primary text-sm" /> {driver.email}
                             </div>
                          </td>
                          <td className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {new Date(driver.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-8 py-6 text-center">
                            <StatusBadge status={driver.driverStatus || "Pending"} />
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-3 transition-all">
                               {driver.driverStatus !== "Active" && (
                                 <button 
                                  onClick={() => handleVerify(driver._id, "Active")}
                                  className="p-2.5 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-xl border border-green-100 transition-all shadow-sm"
                                  title="Approve Driver"
                                 >
                                   <HiOutlineCheck className="text-lg" />
                                 </button>
                               )}
                               {driver.driverStatus !== "Rejected" && (
                                 <button 
                                  onClick={() => handleVerify(driver._id, "Rejected")}
                                  className="p-2.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl border border-red-100 transition-all shadow-sm"
                                  title="Reject Driver"
                                 >
                                   <HiOutlineX className="text-lg" />
                                 </button>
                               )}
                               <button 
                                onClick={() => handleDelete(driver._id)}
                                className="p-2.5 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-100 transition-all shadow-sm"
                                title="Delete Permanently"
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

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-green-50 text-green-600 border-green-100',
    'Pending': 'bg-yellow-50 text-yellow-600 border-yellow-100',
    'Rejected': 'bg-red-50 text-red-600 border-red-100'
  }[status] || 'bg-gray-50 text-gray-500 border-gray-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
  );
};

export default ManageDrivers;