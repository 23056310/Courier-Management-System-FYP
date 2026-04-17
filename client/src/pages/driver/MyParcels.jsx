import React, { useState, useEffect } from "react";
import {
  HiOutlineFilter, HiOutlineDownload, HiOutlineMap,
  HiOutlineDotsVertical, HiOutlineRefresh, HiOutlineCheck,
  HiOutlineTruck, HiOutlineX
} from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { getDriverParcels, updateParcelStatus } from "../../services/parcelService";
import { toast } from "react-hot-toast";

const NEXT_STATUS = {
  "Pending":          { label: "Pick Up",     next: "Picked Up",        color: "bg-primary shadow-primary/20" },
  "Picked Up":        { label: "In Transit",  next: "In Transit",       color: "bg-orange-500 shadow-orange-500/20" },
  "In Transit":       { label: "Out for Del.", next: "Out for Delivery", color: "bg-purple-500 shadow-purple-500/20" },
  "Out for Delivery": { label: "Deliver",     next: "Delivered",        color: "bg-green-500 shadow-green-500/20" },
};

const MyParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { parcelId, nextStatus, label }

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      setLoading(true);
      const res = await getDriverParcels();
      setParcels(res.data || []);
    } catch {
      toast.error("Failed to load assigned parcels");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!confirmModal) return;
    const { parcelId, nextStatus } = confirmModal;
    setUpdatingId(parcelId);
    setConfirmModal(null);
    try {
      await updateParcelStatus(parcelId, nextStatus);
      toast.success(`Status updated to "${nextStatus}"`);
      setParcels(prev =>
        prev.map(p => p._id === parcelId ? { ...p, status: nextStatus } : p)
      );
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const activeParcels = parcels.filter(p => p.status !== "Delivered" && p.status !== "Cancelled");
  const completedParcels = parcels.filter(p => p.status === "Delivered");

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">My Delivery Tasks</h1>
              <p className="text-gray-500 font-medium">
                {activeParcels.length} active · {completedParcels.length} completed
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={fetchParcels} className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                <HiOutlineRefresh /> Refresh
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm shadow-sm">
                <HiOutlineDownload /> Export
              </button>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : parcels.length === 0 ? (
            <div className="py-24 text-center bg-white rounded-[2.5rem] border border-gray-100 border-dashed">
              <HiOutlineTruck className="text-5xl text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold italic">No parcels assigned to you yet.</p>
            </div>
          ) : (
            <>
              {/* ACTIVE PARCELS */}
              {activeParcels.length > 0 && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
                  <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <h2 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500">Active Deliveries</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50 bg-gray-50/50">
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Parcel</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Receiver</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Address</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {activeParcels.map((parcel) => {
                          const next = NEXT_STATUS[parcel.status];
                          return (
                            <tr key={parcel._id} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <HiOutlineMap />
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                                      #{parcel.trackingNumber}
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium">{parcel.parcelDetails?.type}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <p className="font-bold text-gray-700 text-sm">{parcel.recipient?.name}</p>
                                <p className="text-xs text-gray-400">{parcel.recipient?.phone}</p>
                              </td>
                              <td className="px-8 py-6 text-sm text-gray-500 font-medium max-w-[180px] truncate">
                                {parcel.recipient?.address}
                              </td>
                              <td className="px-8 py-6">
                                <StatusBadge status={parcel.status} />
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex justify-end items-center gap-2">
                                  {next && (
                                    <button
                                      disabled={updatingId === parcel._id}
                                      onClick={() => setConfirmModal({ parcelId: parcel._id, nextStatus: next.next, label: next.label })}
                                      className={`px-4 py-2 text-white text-[9px] font-black uppercase tracking-[0.1em] rounded-xl transition-all shadow-md disabled:opacity-50 ${next.color}`}
                                    >
                                      {updatingId === parcel._id ? "..." : next.label}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* DELIVERED PARCELS */}
              {completedParcels.length > 0 && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
                    <HiOutlineCheck className="text-green-500" />
                    <h2 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500">Completed Deliveries</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50 bg-gray-50/50">
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Parcel</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Receiver</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {completedParcels.map((parcel) => (
                          <tr key={parcel._id} className="hover:bg-gray-50/50 transition-colors opacity-70">
                            <td className="px-8 py-5">
                              <p className="font-bold text-gray-700 text-sm">#{parcel.trackingNumber}</p>
                              <p className="text-xs text-gray-400">{parcel.parcelDetails?.type}</p>
                            </td>
                            <td className="px-8 py-5 text-sm text-gray-500 font-medium">{parcel.recipient?.name}</td>
                            <td className="px-8 py-5"><StatusBadge status={parcel.status} /></td>
                            <td className="px-8 py-5 text-xs font-bold text-gray-500 italic">
                              {new Date(parcel.updatedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* CONFIRM MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl mx-auto mb-6">
              <HiOutlineTruck />
            </div>
            <h3 className="text-xl font-black text-gray-900 italic mb-3">Confirm Status Update</h3>
            <p className="text-gray-500 text-sm mb-8">
              Mark this parcel as <span className="font-black text-gray-900">"{confirmModal.nextStatus}"</span>?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-4 border-2 border-gray-100 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Pending":          "bg-gray-50 text-gray-500 border-gray-100",
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

export default MyParcels;