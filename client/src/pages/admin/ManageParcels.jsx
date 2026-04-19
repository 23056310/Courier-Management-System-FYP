import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { 
  HiOutlineSearch, 
  HiOutlineFilter, 
  HiOutlinePlus, 
  HiOutlineTruck, 
  HiOutlineUser, 
  HiOutlineTag, 
  HiOutlineTrash, 
  HiOutlinePencilAlt, 
  HiOutlineX,
  HiOutlineCheckCircle,
  HiOutlineIdentification,
  HiOutlineMail,
  HiOutlineEye
} from "react-icons/hi";
import { 
  getAllParcels, 
  updateParcel, 
  deleteParcel, 
  assignDriver 
} from "../../services/parcelService";
import { getAllUsers } from "../../services/authService";
import { formatProfilePic } from "../../utils/formatProfilePic";
import { toast } from "react-hot-toast";

const ManageParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selection for Assign Modal & View Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [parcelRes, userRes] = await Promise.all([
        getAllParcels(),
        getAllUsers()
      ]);
      setParcels(parcelRes.data);
      setDrivers(userRes.filter(u => u.role === "driver"));
    } catch (error) {
      toast.error("Failed to load platform data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this parcel?")) {
      try {
        await deleteParcel(id);
        toast.success("Parcel removed");
        setParcels(parcels.filter(p => p._id !== id));
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleOpenAssign = (parcel) => {
    setSelectedParcel(parcel);
    setShowAssignModal(true);
  };

  const handleOpenView = (parcel) => {
    setSelectedParcel(parcel);
    setShowViewModal(true);
  };

  const handleAssignDriver = async (driverId) => {
    try {
      await assignDriver(selectedParcel._id, driverId);
      toast.success("Driver assigned successfully");
      setShowAssignModal(false);
      fetchData(); // Refresh list
    } catch (error) {
      toast.error("Assignment failed");
    }
  };

  const handleApprove = async (id) => {
    try {
      await updateParcel(id, { status: "Approved" });
      toast.success("Request Approved");
      fetchData();
    } catch (e) { toast.error("Error approving request"); }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to cancel/reject this request?")) {
      try {
        await updateParcel(id, { status: "Cancelled" });
        toast.success("Request Cancelled");
        fetchData();
      } catch (e) { toast.error("Error cancelling request"); }
    }
  };

  const exportAdminCSV = () => {
    const header = "Tracking Number,Sender,Recipient,Status,UpdatedAt\n";
    const data = filteredParcels.map(p => `${p.trackingNumber},"${p.sender.name}","${p.recipient.name}",${p.status},"${new Date(p.updatedAt).toLocaleString()}"`).join("\n");
    const blob = new Blob([header + data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin_parcels.csv';
    a.click();
  };

  const filteredParcels = parcels.filter(p => {
    const matchesSearch = p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Shipment Console</h1>
               <p className="text-gray-500 font-medium">Full control over global logistics and driver assignments.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <div className="relative flex-1 md:w-64">
                 <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                  type="text" 
                  placeholder="Tracking / Sender / Recipient"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-sm shadow-sm"
                 />
               </div>
               <button 
                onClick={exportAdminCSV}
                className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-all text-[10px] shadow-sm whitespace-nowrap"
               >
                 Export CSV
               </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredParcels.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                 <HiOutlineTag className="text-6xl mb-4" />
                 <p className="font-bold text-lg">No active shipments found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50 bg-gray-50/50">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Shipment Info</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Sender & Recipient</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Logistics</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredParcels.map((parcel) => (
                      <tr key={parcel._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/5 rounded-[1.25rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border-2 border-transparent group-hover:border-white shadow-sm">
                               <HiOutlineTag className="text-xl" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm uppercase tracking-tighter">#{parcel.trackingNumber}</p>
                              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{parcel.parcelDetails.type}</p>
                              <p className="text-[9px] text-gray-400 italic mt-1">
                                {new Date(parcel.updatedAt).toLocaleDateString()} · {new Date(parcel.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="space-y-3">
                             <div>
                               <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {parcel.sender?.name}
                               </div>
                               <p className="pl-3.5 text-[9px] text-gray-400 uppercase tracking-widest">{parcel.sender?.address}</p>
                             </div>
                             <div>
                               <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                 <span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> {parcel.recipient?.name}
                               </div>
                               <p className="pl-3.5 text-[9px] text-gray-400 uppercase tracking-widest">{parcel.recipient?.address}</p>
                             </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div 
                            onClick={() => {
                              if (['Pending', 'Cancelled'].includes(parcel.status)) {
                                toast.error('Action denied. Please approve the request first.');
                              } else if (parcel.assignedDriver) {
                                toast.error('Driver already assigned. To change, please contact system admin.');
                              } else {
                                handleOpenAssign(parcel);
                              }
                            }}
                            className={`flex items-center gap-3 group/driver p-2 rounded-xl transition-all ${(['Pending', 'Cancelled'].includes(parcel.status) || parcel.assignedDriver) ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:bg-gray-100'}`}
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden relative">
                               {parcel.assignedDriver ? (
                                 parcel.assignedDriver.profilePic ? (
                                   <img src={formatProfilePic(parcel.assignedDriver.profilePic)} className="w-full h-full object-cover" />
                                 ) : (
                                   <HiOutlineUser className="text-gray-400" />
                                 )
                               ) : (
                                 <HiOutlineTruck className={`text-gray-400 ${parcel.status === 'Approved' ? 'animate-bounce text-orange-400' : ''}`} />
                               )}
                               {!parcel.assignedDriver && parcel.status === 'Approved' && <div className="absolute inset-0 bg-orange-500/10" />}
                            </div>
                            <div>
                               <p className={`text-[10px] font-black uppercase tracking-widest ${parcel.assignedDriver ? 'text-green-600' : 'text-orange-500'}`}>
                                 {parcel.assignedDriver ? parcel.assignedDriver.name : "Awaiting Driver"}
                               </p>
                               <p className="text-[8px] text-gray-400 font-bold italic">
                                 {parcel.assignedDriver ? "Fleet member synchronized" : "Click to assign member"}
                               </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <StatusBadge status={parcel.status} />
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-3 transition-opacity">
                             {parcel.status === 'Pending' && (
                               <>
                                 <button onClick={() => handleApprove(parcel._id)} className="p-2.5 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-xl border border-green-100 transition-all shadow-sm cursor-pointer" title="Approve">
                                   <HiOutlineCheckCircle className="text-lg pointer-events-none" />
                                 </button>
                                 <button onClick={() => handleReject(parcel._id)} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl border border-red-100 transition-all shadow-sm cursor-pointer" title="Reject">
                                   <HiOutlineX className="text-lg pointer-events-none" />
                                 </button>
                               </>
                             )}
                             <button 
                              onClick={() => handleOpenView(parcel)}
                              className="p-2.5 bg-white text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl border border-gray-100 transition-all shadow-sm"
                              title="View Details"
                             >
                               <HiOutlineEye className="text-lg" />
                             </button>
                             <button 
                              onClick={() => handleDelete(parcel._id)}
                              className="p-2.5 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-100 transition-all shadow-sm"
                             >
                               <HiOutlineTrash className="text-lg" />
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

          {/* MODALS */}
          
          {/* VIEW PARCEL MODAL */}
          {showViewModal && selectedParcel && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
              <div className="bg-white rounded-[3rem] w-full max-w-3xl p-10 shadow-2xl relative">
                <button 
                  onClick={() => setShowViewModal(false)} 
                  className="absolute top-8 right-8 p-3 bg-gray-50 rounded-[1.25rem] text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all z-20"
                >
                  <HiOutlineX className="text-2xl" />
                </button>

                <div className="mb-8">
                   <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900 mb-1">
                     Parcel Details
                   </h2>
                   <p className="text-gray-500 font-medium text-sm">Tracking No: <span className="text-primary font-bold">#{selectedParcel.trackingNumber}</span></p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Sender Info */}
                  <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block ml-1"><span className="text-primary mr-2">●</span>Origin / Sender</p>
                    <p className="font-bold text-gray-900 text-sm">{selectedParcel.sender?.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedParcel.sender?.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedParcel.sender?.phone}</p>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest mt-3 uppercase">{selectedParcel.sender?.address}</p>
                  </div>

                  {/* Recipient Info */}
                  <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block ml-1"><span className="text-orange-500 mr-2">●</span>Destination / Recipient</p>
                    <p className="font-bold text-gray-900 text-sm">{selectedParcel.recipient?.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedParcel.recipient?.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedParcel.recipient?.phone}</p>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest mt-3 uppercase">{selectedParcel.recipient?.address}</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <span className="block text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">Type</span>
                    <span className="font-bold text-gray-900 text-sm">{selectedParcel.parcelDetails?.type}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">Weight</span>
                    <span className="font-bold text-gray-900 text-sm">{selectedParcel.parcelDetails?.weight} kg</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">Status</span>
                    <StatusBadge status={selectedParcel.status} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">Driver</span>
                    <span className="font-bold text-gray-900 text-sm">{selectedParcel.assignedDriver?.name || "Unassigned"}</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ASSIGN DRIVER MODAL */}
          {showAssignModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm">
              <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900">Assign Driver</h2>
                  <button onClick={() => setShowAssignModal(false)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all"><HiOutlineX /></button>
                </div>

                 <div className="space-y-4 max-h-[400px] overflow-y-auto px-2 custom-scrollbar">
                   {drivers.filter(d => d.driverStatus === 'Active').map(driver => (
                     <div 
                      key={driver._id}
                      onClick={() => handleAssignDriver(driver._id)}
                      className="flex items-center gap-4 p-5 bg-gray-50 rounded-[1.5rem] cursor-pointer hover:bg-primary hover:text-white transition-all group"
                     >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-white group-hover:border-white/20 shadow-sm bg-white text-gray-400">
                          {driver.profilePic === "/default-avatar.png" || !driver.profilePic ? (
                            <HiOutlineUser className="text-2xl" />
                          ) : (
                            <img src={driver.profilePic} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold uppercase tracking-tighter italic text-sm">{driver.name}</p>
                          <p className="text-[10px] uppercase tracking-widest opacity-60 font-black">{driver.email}</p>
                        </div>
                        <HiOutlinePlus className="text-xl rotate-45 group-hover:rotate-0 transition-transform" />
                     </div>
                   ))}
                   {drivers.filter(d => d.driverStatus === 'Active').length === 0 && <p className="text-center text-gray-400 font-bold italic py-10">No active drivers available</p>}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
const StatusBadge = ({ status }) => {
  const styles = {
    'Delivered': 'bg-green-50 text-green-600 border-green-100',
    'In Transit': 'bg-orange-50 text-orange-600 border-orange-100',
    'Pending': 'bg-primary/5 text-primary border-primary/10',
    'Cancelled': 'bg-red-50 text-red-600 border-red-100',
    'Picked Up': 'bg-blue-50 text-blue-600 border-blue-100',
    'Approved': 'bg-teal-50 text-teal-600 border-teal-100',
    'Out for Delivery': 'bg-purple-50 text-purple-600 border-purple-100'
  }[status] || 'bg-gray-50 text-gray-500 border-gray-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles} whitespace-nowrap`}>
      {status}
    </span>
  );
};

export default ManageParcels;