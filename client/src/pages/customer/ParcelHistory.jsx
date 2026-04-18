import React, { useState, useEffect } from "react";
import {
  HiOutlineSearch, HiOutlineFilter, HiOutlineDownload,
  HiOutlineCube, HiOutlineRefresh, HiOutlinePlus,
  HiOutlinePencilAlt, HiOutlineTrash, HiOutlineX, 
  HiOutlineUser, HiOutlineTag, HiOutlineMail, HiOutlineCheckCircle
} from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { getMyParcels, customerUpdateParcel, customerDeleteParcel } from "../../services/parcelService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ParcelHistory = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [formData, setFormData] = useState({
    sender: { name: "", email: "", phone: "", address: "" },
    recipient: { name: "", email: "", phone: "", address: "" },
    parcelDetails: { weight: 1, dimensions: "", type: "Other", description: "" }
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      setLoading(true);
      const res = await getMyParcels();
      setParcels(res.data || []);
    } catch {
      toast.error("Failed to load parcels");
    } finally {
      setLoading(false);
    }
  };

  const filtered = parcels.filter(p => {
    const matchSearch =
      p.trackingNumber?.toLowerCase().includes(search.toLowerCase()) ||
      p.recipient?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statuses = ["All", "Pending", "Approved", "Picked Up", "In Transit", "Out for Delivery", "Delivered", "Cancelled"];

  const exportCustomerCSV = () => {
    const header = "Tracking Number,Recipient,Type,Status,Date\n";
    const data = filtered.map(p => `${p.trackingNumber},"${p.recipient?.name}",${p.parcelDetails?.type},${p.status},"${new Date(p.createdAt).toLocaleString()}"`).join("\n");
    const blob = new Blob([header + data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_parcel_history.csv';
    a.click();
  };

  const handleOpenEdit = (parcel) => {
    setSelectedParcel(parcel);
    setFormData({
      sender: parcel.sender,
      recipient: parcel.recipient,
      parcelDetails: parcel.parcelDetails
    });
    setShowFormModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this parcel request?")) {
      try {
        await customerDeleteParcel(id);
        toast.success("Parcel request cancelled");
        fetchParcels();
      } catch {
        toast.error("Failed to cancel parcel");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerUpdateParcel(selectedParcel._id, formData);
      toast.success("Parcel details updated");
      setShowFormModal(false);
      fetchParcels();
    } catch {
      toast.error("Update failed. Make sure parcel is Pending.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">My Parcels</h1>
              <p className="text-gray-500 font-medium">{parcels.length} total shipments in your account</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={fetchParcels} className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                <HiOutlineRefresh /> Refresh
              </button>
              <button onClick={exportCustomerCSV} className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                <HiOutlineDownload /> Export
              </button>
              <button
                onClick={() => navigate("/customer/create-parcel")}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-lg"
              >
                <HiOutlinePlus /> New Parcel
              </button>
            </div>
          </div>

          {/* FILTERS */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tracking ID or receiver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-sm shadow-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    statusFilter === s
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <HiOutlineCube className="text-5xl mb-4" />
                <p className="font-bold italic">No parcels found</p>
                <button
                  onClick={() => navigate("/customer/create-parcel")}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 transition-all"
                >
                  Book Your First Parcel
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50 bg-gray-50/50">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Tracking</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Sender</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Recipient</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Last Update</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Track</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((parcel) => (
                      <tr key={parcel._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <HiOutlineCube />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                                #{parcel.trackingNumber}
                              </p>
                              <p className="text-xs text-gray-400 font-medium capitalize">{parcel.deliveryMethod}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-gray-700 text-sm">{parcel.sender?.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[150px]">{parcel.sender?.address}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-gray-700 text-sm">{parcel.recipient?.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[150px]">{parcel.recipient?.address}</p>
                        </td>
                        <td className="px-8 py-6"><StatusBadge status={parcel.status} /></td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-700 italic">
                          <span>{new Date(parcel.updatedAt).toLocaleDateString()}</span>
                          <span className="block text-xs font-medium text-gray-400">{new Date(parcel.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end items-center gap-2">
                            {parcel.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleOpenEdit(parcel)}
                                  className="p-2 bg-white text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl border border-gray-100 transition-all shadow-sm"
                                  title="Edit Parcel"
                                >
                                  <HiOutlinePencilAlt className="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDelete(parcel._id)}
                                  className="p-2 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-gray-100 transition-all shadow-sm"
                                  title="Delete Parcel"
                                >
                                  <HiOutlineTrash className="text-sm" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => navigate(`/customer/track-parcel?id=${parcel.trackingNumber}`)}
                              className="px-4 py-2 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all ml-2"
                            >
                              Track
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && filtered.length > 0 && (
              <div className="px-8 py-5 border-t border-gray-50 bg-gray-50/50 text-xs font-bold text-gray-400 italic">
                Showing {filtered.length} of {parcels.length} parcels
              </div>
            )}
          </div>
        </main>
      </div>

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
                 Update Shipment
               </h2>
               <p className="text-gray-500 font-medium">Modify your pending parcel details before dispatch.</p>
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
               <div className="md:col-span-2 grid md:grid-cols-3 gap-8 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
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
               </div>

               <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit"
                    className="w-full py-6 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-[2rem] hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-4 text-lg active:scale-95 translate-y-0 group hover:-translate-y-1"
                  >
                     <HiOutlineCheckCircle className="text-2xl" />
                     Finalize Update
                  </button>
               </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Pending":          "bg-gray-50 text-gray-500 border-gray-100",
    "Approved":         "bg-teal-50 text-teal-600 border-teal-100",
    "Picked Up":        "bg-blue-50 text-blue-600 border-blue-100",
    "In Transit":       "bg-orange-50 text-orange-600 border-orange-100",
    "Out for Delivery": "bg-purple-50 text-purple-600 border-purple-100",
    "Delivered":        "bg-green-50 text-green-600 border-green-100",
    "Cancelled":        "bg-red-50 text-red-600 border-red-100",
  }[status] || "bg-gray-50 text-gray-500 border-gray-100";

  return (
    <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles}`}>
      {status}
    </span>
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

export default ParcelHistory;