import React, { useState } from "react";
import { 
  HiOutlineSearch, 
  HiOutlineCube, 
  HiOutlineTruck, 
  HiOutlineHome, 
  HiOutlineCheckCircle,
  HiOutlineLocationMarker,
  HiOutlineCalendar
} from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = () => {
    if (!trackingId) return;
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        trackingId: trackingId,
        status: "In Transit",
        sender: "Kathmandu Main Hub",
        receiver: "Pokhara Branch Office",
        estimatedDelivery: "April 18, 2026",
        currentLocation: "Bharatpur Sorting Center",
        steps: [
          { label: "Booked", completed: true, date: "April 15, 09:00 AM" },
          { label: "Dispatched", completed: true, date: "April 15, 02:30 PM" },
          { label: "In Transit", completed: true, date: "April 16, 08:15 AM", current: true },
          { label: "Out for Delivery", completed: false },
          { label: "Delivered", completed: false },
        ]
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="overflow-x-hidden pt-20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-primary/5 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8 italic">
            Trace Your <span className="text-primary">Shipment.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-12">
            Stay updated with real-time location and status of your parcels globally.
          </p>

          {/* SEARCH BOX */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-x-0 -bottom-2 h-full bg-primary/20 rounded-2xl blur-xl group-hover:opacity-100 opacity-50 transition-opacity" />
            <div className="relative flex p-2 bg-white rounded-2xl border border-gray-100 shadow-xl items-center">
              <HiOutlineSearch className="ml-4 text-2xl text-gray-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. CMS-982341)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="w-full px-4 py-4 focus:outline-none font-medium text-gray-900"
              />
              <button 
                onClick={handleTrack}
                disabled={isLoading}
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "Track Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKING RESULTS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        {result ? (
          <div>
            {/* PRIMARY DETAILS CARDS */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <StatusDetailCard 
                icon={<HiOutlineCube />}
                label="Tracking ID"
                value={result.trackingId}
              />
              <StatusDetailCard 
                icon={<HiOutlineLocationMarker />}
                label="Current Location"
                value={result.currentLocation}
              />
              <StatusDetailCard 
                icon={<HiOutlineCalendar />}
                label="Estimated Arrival"
                value={result.estimatedDelivery}
              />
            </div>

            {/* TIMELINE VISUAL */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-2xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold mb-12 italic">Shipment Journey</h3>
              
              <div className="relative">
                {/* Vertical Line for Mobile */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-100 md:hidden" />
                
                {/* Horizontal Line for Desktop */}
                <div className="absolute left-0 top-6 w-full h-0.5 bg-gray-100 hidden md:block" />

                <div className="relative flex flex-col md:flex-row justify-between gap-12">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex md:flex-col items-start md:items-center gap-6 md:gap-4 md:text-center shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 ${
                        step.completed 
                        ? "bg-primary text-white shadow-lg shadow-primary/30" 
                        : "bg-gray-100 text-gray-400"
                      }`}>
                        {idx === 0 ? <HiOutlineCube /> : 
                         idx === 2 ? <HiOutlineTruck /> : 
                         idx === 4 ? <HiOutlineHome /> : <HiOutlineCheckCircle />}
                      </div>
                      
                      <div>
                        <h4 className={`font-bold text-lg mb-1 ${step.completed ? "text-gray-900" : "text-gray-400"}`}>
                          {step.label}
                        </h4>
                        {step.date && (
                          <p className="text-xs text-gray-500 font-medium">{step.date}</p>
                        )}
                        {step.current && (
                          <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECONDARY INFO */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Shipment Info</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 py-2">
                     <span className="text-gray-500">Sender</span>
                     <span className="font-bold">{result.sender}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                     <span className="text-gray-500">Receiver</span>
                     <span className="font-bold">{result.receiver}</span>
                  </div>
                </div>
              </div>
              <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 flex flex-col justify-center items-center text-center">
                <p className="text-sm text-gray-600 mb-4 italic">Something seems wrong with your delivery?</p>
                <button className="text-primary font-black hover:underline underline-offset-4 transition-all">
                  Report an Issue
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 italic">
            Enter a valid tracking ID to see results.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

const StatusDetailCard = ({ icon, label, value }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default TrackParcel;