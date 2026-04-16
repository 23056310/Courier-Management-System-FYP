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
  HiOutlineMail
} from "react-icons/hi";
import { 
  getAllParcels, 
  createParcel, 
  updateParcel, 
  deleteParcel, 
  assignDriver 
} from "../../services/parcelService";
import { getAllUsers } from "../../services/authService";
import { toast } from "react-hot-toast";

const ManageParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selection for Assign Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Selection for Create/Edit Modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    sender: { name: "", email: "", phone: "", address: "" },
    recipient: { name: "", email: "", phone: "", address: "" },
    parcelDetails: { weight: 1, dimensions: "", type: "Other", description: "" },
    cost: 50,
    deliveryMethod: "Standard",
    status: "Pending"
  });

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

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({
      sender: { name: "", email: "", phone: "", address: "" },
      recipient: { name: "", email: "", phone: "", address: "" },
      parcelDetails: { weight: 1, dimensions: "", type: "Other", description: "" },
      cost: 50,
      deliveryMethod: "Standard",
      status: "Pending"
    });
    setShowFormModal(true);
  };

  const handleOpenEdit = (parcel) => {
    setIsEditing(true);
    setSelectedParcel(parcel);
    setFormData({
      sender: parcel.sender,
      recipient: parcel.recipient,
      parcelDetails: parcel.parcelDetails,
      cost: parcel.cost,
      deliveryMethod: parcel.deliveryMethod,
      status: parcel.status
    });
    setShowFormModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateParcel(selectedParcel._id, formData);
        toast.success("Parcel updated");
      } else {
        await createParcel(formData);
        toast.success("New parcel created");
      }
      setShowFormModal(false);
      fetchData();
    } catch (error) {
      toast.error("Process failed. Please check inputs.");
    }
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
                onClick={handleOpenCreate}
                className="flex items-center gap-2 px-6 py-4 bg-gray-900 border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-primary transition-all text-[10px] shadow-xl whitespace-nowrap"
               >
                 <HiOutlinePlus className="text-base" /> New Shipment
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
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="space-y-1">
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-700 italic">
                               <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {parcel.sender.name}
                             </div>
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
                               <span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> {parcel.recipient.name}
                             </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div 
                            onClick={() => handleOpenAssign(parcel)}
                            className="flex items-center gap-3 cursor-pointer group/driver hover:bg-gray-100 p-2 rounded-xl transition-all"
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden relative">
                               {parcel.assignedDriver ? (
                                 <img src={parcel.assignedDriver.profilePic || "https://i.pravatar.cc/100"} className="w-full h-full object-cover" />
                               ) : (
                                 <HiOutlineTruck className="text-gray-400" />
                               )}
                               {!parcel.assignedDriver && <div className="absolute inset-0 bg-red-500/10 animate-pulse" />}
                            </div>
                            <div>
                               <p className={`text-[10px] font-black uppercase tracking-widest ${parcel.assignedDriver ? 'text-gray-900' : 'text-red-500'}`}>
                                 {parcel.assignedDriver ? parcel.assignedDriver.name : "Unassigned"}
                               </p>
                               <p className="text-[8px] text-gray-400 font-bold italic">Click to manage driver</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <StatusBadge status={parcel.status} />
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                              onClick={() => handleOpenEdit(parcel)}
                              className="p-2.5 bg-white text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl border border-gray-100 transition-all shadow-sm"
                             >
                               <HiOutlinePencilAlt className="text-lg" />
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
          
          {/* ASSIGN DRIVER MODAL */}
          {showAssignModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm">
              <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900">Assign Driver</h2>
                  <button onClick={() => setShowAssignModal(false)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all"><HiOutlineX /></button>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto px-2 custom-scrollbar">
                   {drivers.map(driver => (
                     <div 
                      key={driver._id}
                      onClick={() => handleAssignDriver(driver._id)}
                      className="flex items-center gap-4 p-5 bg-gray-50 rounded-[1.5rem] cursor-pointer hover:bg-primary hover:text-white transition-all group"
                     >
                        <img src={driver.profilePic || "https://i.pravatar.cc/100"} className="w-12 h-12 rounded-2xl object-cover border-2 border-white group-hover:border-white/20 shadow-sm" />
                        <div className="flex-1">
                          <p className="font-bold uppercase tracking-tighter italic text-sm">{driver.name}</p>
                          <p className="text-[10px] uppercase tracking-widest opacity-60 font-black">{driver.email}</p>
                        </div>
                        <HiOutlinePlus className="text-xl rotate-45 group-hover:rotate-0 transition-transform" />
                     </div>
                   ))}
                   {drivers.length === 0 && <p className="text-center text-gray-400 font-bold italic py-10">No active drivers found</p>}
                </div>
              </div>
            </div>
          )}

          {/* CREATE / EDIT SHIPMENT MODAL */}
          {showFormModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-gray-900/80 backdrop-blur-md">
              <div className="bg-white rounded-[3rem] w-full max-w-4xl p-12 shadow-2xl relative overflow-hidden border border-gray-100 scale-100 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh] custom-scrollbar">
                
                <button 
                  onClick={() => setShowFormModal(false)} 
                  className="absolute top-8 right-8 p-4 bg-gray-50 rounded-[1.25rem] text-gray-400 hover:text-gray-900 transition-all z-20"
                >
                  <HiOutlineX className="text-2xl" />
                </button>

                <div className="mb-12">
                   <h2 className="text-4xl font-black italic tracking-tighter uppercase text-gray-900 mb-2">
                     {isEditing ? "Update Shipment" : "Prepare New Dispatch"}
                   </h2>
                   <p className="text-gray-500 font-medium">Coordinate the full lifecycle of this active courier parcel.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
                   
                   {/* SENDER INFO */}
                   <div className="space-y-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 italic flex items-center gap-2">
                        <span className="w-8 h-px bg-primary/20" /> Origin Details
                      </p>
                      <FormInput label="Sender Full Name" value={formData.sender.name} onChange={(val) => setFormData({...formData, sender: {...formData.sender, name: val}})} icon={<HiOutlineUser />} />
                      <FormInput label="Sender Email" type="email" value={formData.sender.email} onChange={(val) => setFormData({...formData, sender: {...formData.sender, email: val}})} icon={<HiOutlineMail />} />
                      <FormInput label="Sender Contact Phone" value={formData.sender.phone} onChange={(val) => setFormData({...formData, sender: {...formData.sender, phone: val}})} icon={<HiOutlineTag />} />
                      <FormInput label="Pickup Address" value={formData.sender.address} onChange={(val) => setFormData({...formData, sender: {...formData.sender, address: val}})} icon={<HiOutlineTag />} />
                   </div>

                   {/* RECIPIENT INFO */}
                   <div className="space-y-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2 italic flex items-center gap-2">
                        <span className="w-8 h-px bg-orange-500/20" /> Destination Target
                      </p>
                      <FormInput label="Recipient Full Name" value={formData.recipient.name} onChange={(val) => setFormData({...formData, recipient: {...formData.recipient, name: val}})} icon={<HiOutlineUser />} />
                      <FormInput label="Recipient Email" type="email" value={formData.recipient.email} onChange={(val) => setFormData({...formData, recipient: {...formData.recipient, email: val}})} icon={<HiOutlineMail />} />
                      <FormInput label="Recipient Contact Phone" value={formData.recipient.phone} onChange={(val) => setFormData({...formData, recipient: {...formData.recipient, phone: val}})} icon={<HiOutlineTag />} />
                      <FormInput label="Delivery Address" value={formData.recipient.address} onChange={(val) => setFormData({...formData, recipient: {...formData.recipient, address: val}})} icon={<HiOutlineTag />} />
                   </div>

                   {/* PARCEL DETAILS */}
                   <div className="md:col-span-2 grid md:grid-cols-4 gap-8 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                      <div className="relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block ml-1">Weight (kg)</label>
                        <input 
                          type="number" 
                          value={formData.parcelDetails.weight}
                          onChange={(e) => setFormData({...formData, parcelDetails: {...formData.parcelDetails, weight: e.target.value}})}
                          className="w-full px-6 py-4 bg-white border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold transition-all text-sm shadow-sm"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block ml-1">Dimensions</label>
                        <input 
                          type="text" 
                          placeholder="20x20x10"
                          value={formData.parcelDetails.dimensions}
                          onChange={(e) => setFormData({...formData, parcelDetails: {...formData.parcelDetails, dimensions: e.target.value}})}
                          className="w-full px-6 py-4 bg-white border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold transition-all text-sm shadow-sm"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block ml-1">Type</label>
                        <select 
                          value={formData.parcelDetails.type}
                          onChange={(e) => setFormData({...formData, parcelDetails: {...formData.parcelDetails, type: e.target.value}})}
                          className="w-full px-6 py-4 bg-white border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold transition-all text-sm shadow-sm appearance-none"
                        >
                          {['Document', 'Electronics', 'Clothing', 'Fragile', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block ml-1">Cost ($)</label>
                        <input 
                          type="number" 
                          value={formData.cost}
                          onChange={(e) => setFormData({...formData, cost: e.target.value})}
                          className="w-full px-6 py-4 bg-white border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold transition-all text-sm shadow-sm"
                        />
                      </div>
                   </div>

                   <div className="md:col-span-2 pt-4">
                      <button 
                        type="submit"
                        className="w-full py-6 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-[2rem] hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-4 text-lg active:scale-95 translate-y-0 group hover:-translate-y-1"
                      >
                         {isEditing ? <HiOutlineCheckCircle className="text-2xl" /> : <HiOutlineTruck className="text-2xl" />}
                         {isEditing ? "Finalize Update" : "Authorize Dispatch"}
                      </button>
                   </div>
                </form>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

const FormInput = ({ label, value, onChange, icon, type = "text" }) => (
  <div className="relative group">
    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1 transition-colors group-focus-within:text-primary">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-lg">
        {icon}
      </div>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 text-sm placeholder:text-gray-300"
        required
      />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'Delivered': 'bg-green-50 text-green-600 border-green-100',
    'In Transit': 'bg-orange-50 text-orange-600 border-orange-100',
    'Pending': 'bg-primary/5 text-primary border-primary/10',
    'Cancelled': 'bg-red-50 text-red-600 border-red-100',
    'Picked Up': 'bg-blue-50 text-blue-600 border-blue-100',
    'Out for Delivery': 'bg-purple-50 text-purple-600 border-purple-100'
  }[status] || 'bg-gray-50 text-gray-500 border-gray-100';

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles} whitespace-nowrap`}>
      {status}
    </span>
  );
};

export default ManageParcels;