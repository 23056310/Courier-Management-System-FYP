import React, { useState, useEffect } from "react";
import { 
  HiOutlineSearch, HiOutlineCube, HiOutlineTruck,
  HiOutlineHome, HiOutlineCheckCircle, HiOutlineLocationMarker,
  HiOutlineCalendar, HiOutlineArrowRight, HiOutlineX
} from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { trackParcelByNumber } from "../../services/parcelService";
import { toast } from "react-hot-toast";
import { useSearchParams, Link } from "react-router-dom";

const STATUS_STEPS = ["Pending", "Approved", "Picked Up", "In Transit", "Out for Delivery", "Delivered"];

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setTrackingId(id);
      // Auto-track
      (async () => {
        setIsLoading(true);
        setNotFound(false);
        try {
          const res = await trackParcelByNumber(id);
          setResult(res.data);
        } catch {
          setNotFound(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, []);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setIsLoading(true);
    setNotFound(false);
    setResult(null);
    try {
      const res = await trackParcelByNumber(trackingId.trim());
      setResult(res.data);
    } catch (error) {
      if (error?.response?.status === 404) {
        setNotFound(true);
      } else {
        toast.error("Failed to fetch tracking info");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepIndex = result ? STATUS_STEPS.indexOf(result.status) : -1;

  const stepIcons = [
    <HiOutlineCube />, <HiOutlineCheckCircle />, <HiOutlineTruck />, <HiOutlineTruck />,
    <HiOutlineHome />, <HiOutlineCheckCircle />
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">Track Your Parcel</h1>
              <p className="text-gray-500 font-medium">Enter your tracking ID to get real-time shipment updates.</p>
            </div>

            {/* SEARCH */}
            <div className="relative mb-12 group">
              <div className="absolute inset-x-0 -bottom-2 h-full bg-primary/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex p-3 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl items-center">
                <HiOutlineSearch className="ml-6 text-2xl text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter Tracking ID (e.g. TRK982341XY)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                  className="w-full px-6 py-5 focus:outline-none font-bold text-gray-900 text-sm placeholder:font-medium placeholder:text-gray-400"
                />
                {trackingId && (
                  <button onClick={() => { setTrackingId(""); setResult(null); setNotFound(false); }} className="p-2 text-gray-300 hover:text-gray-500 transition-colors mr-2">
                    <HiOutlineX />
                  </button>
                )}
                <button
                  onClick={handleTrack}
                  disabled={isLoading}
                  className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all disabled:opacity-50 flex items-center gap-2 group/btn whitespace-nowrap"
                >
                  {isLoading ? "Searching..." : <><span>Track</span><HiOutlineArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform" /></>}
                </button>
              </div>
            </div>

            {/* NOT FOUND */}
            {notFound && (
              <div className="py-20 text-center bg-white rounded-[2.5rem] border border-red-100 border-dashed">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiOutlineX className="text-3xl text-red-400" />
                </div>
                <p className="text-gray-700 font-bold text-lg italic mb-2">No parcel found</p>
                <p className="text-gray-400 text-sm">Double-check your tracking ID and try again.</p>
              </div>
            )}

            {/* EMPTY STATE */}
            {!result && !notFound && !isLoading && (
              <div className="py-24 text-center bg-white rounded-[2.5rem] border border-gray-100 border-dashed">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiOutlineSearch className="text-3xl text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold italic">Enter a tracking ID above to see results.</p>
              </div>
            )}

            {/* RESULTS */}
            {result && (
              <div>
                {/* STAT CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <DetailCard icon={<HiOutlineCube />} label="Tracking ID" value={result.trackingNumber} color="primary" />
                  <DetailCard icon={<HiOutlineLocationMarker />} label="Status" value={result.status} color="orange" />
                  <DetailCard
                    icon={<HiOutlineCalendar />}
                    label="Estimated Delivery"
                    value={result.estimatedDelivery ? new Date(result.estimatedDelivery).toLocaleDateString() : "TBD"}
                    color="purple"
                  />
                </div>

                {/* TIMELINE */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 md:p-14 shadow-sm relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-16">
                      <h3 className="text-2xl font-black italic text-gray-900 uppercase tracking-tighter">Shipment Journey</h3>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </div>

                    <div className="relative">
                      <div className="absolute left-7 top-0 h-full w-1 bg-gray-100 md:hidden rounded-full" />
                      <div className="absolute left-0 top-7 w-full h-1 bg-gray-100 hidden md:block rounded-full" />
                      <div className="absolute left-0 top-7 h-1 bg-primary hidden md:block rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(0, (currentStepIndex / (STATUS_STEPS.length - 1)) * 100)}%` }} />

                      <div className="relative flex flex-col md:flex-row justify-between gap-10">
                        {STATUS_STEPS.map((step, idx) => {
                          const done = idx <= currentStepIndex;
                          const active = idx === currentStepIndex;
                          return (
                            <div key={step} className="relative z-10 flex md:flex-col items-start md:items-center gap-6 md:gap-5 md:text-center shrink-0">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${
                                done
                                  ? "bg-primary text-white shadow-xl shadow-primary/30 scale-110"
                                  : "bg-gray-50 text-gray-300 border-2 border-dashed border-gray-100"
                              }`}>
                                {stepIcons[idx]}
                              </div>
                              <div className="pt-2">
                                <h4 className={`font-black uppercase tracking-widest text-[10px] mb-1 ${done ? "text-gray-900" : "text-gray-400"}`}>
                                  {step}
                                </h4>
                                {active && (
                                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-green-500/30">
                                    Current
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SHIPMENT INFO */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                    <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Shipment Info</h4>
                    <div className="space-y-3">
                      <InfoRow label="From" value={result.sender ? `${result.sender.name} - ${result.sender.address}` : "—"} />
                      <InfoRow label="To" value={result.recipient ? `${result.recipient.name} - ${result.recipient.address}` : "—"} />
                      <InfoRow label="Type" value={result.parcelDetails?.type || "—"} />
                      <InfoRow label="Last Update" value={`${new Date(result.updatedAt).toLocaleDateString()} ${new Date(result.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`} />
                      <InfoRow label="Weight" value={result.parcelDetails?.weight ? `${result.parcelDetails.weight} kg` : "—"} />
                      {result.assignedDriver && <InfoRow label="Driver" value={result.assignedDriver.name} />}
                    </div>
                  </div>
                  <div className="p-8 bg-gray-900 rounded-[2rem] flex flex-col justify-center items-center text-center gap-4">
                    <p className="text-gray-400 text-sm font-bold italic">Need help with this shipment?</p>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Our support team is here 24/7</p>
                    <Link to="/contact">
                      <button className="mt-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-primary transition-all">
                        Send Inquiry
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, label, value, color }) => {
  const colors = {
    primary: { icon: "bg-primary shadow-primary/20", dot: "bg-primary/5" },
    orange:  { icon: "bg-orange-500 shadow-orange-500/20", dot: "bg-orange-500/5" },
    purple:  { icon: "bg-purple-500 shadow-purple-500/20", dot: "bg-purple-500/5" },
  };
  const c = colors[color];
  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-all group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${c.icon}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900 italic">{value}</p>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-100 py-2">
    <span className="text-gray-400 text-xs font-bold">{label}</span>
    <span className="font-bold text-gray-900 text-xs">{value}</span>
  </div>
);

const statusColor = (status) => ({
  "Pending":          "bg-primary/5 text-primary border-primary/10",
  "Approved":         "bg-teal-50 text-teal-600 border-teal-100",
  "Picked Up":        "bg-blue-50 text-blue-600 border-blue-100",
  "In Transit":       "bg-orange-50 text-orange-600 border-orange-100",
  "Out for Delivery": "bg-purple-50 text-purple-600 border-purple-100",
  "Delivered":        "bg-green-50 text-green-600 border-green-100",
  "Cancelled":        "bg-red-50 text-red-600 border-red-100",
}[status] || "bg-gray-50 text-gray-500 border-gray-100");

export default TrackParcel;
