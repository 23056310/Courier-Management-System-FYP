import React, { useState, useContext } from "react";
import {
  HiOutlineCube, HiOutlineUser, HiOutlineLocationMarker,
  HiOutlineTruck, HiOutlineArrowRight, HiOutlineCheckCircle,
  HiOutlineTag
} from "react-icons/hi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { customerCreateParcel } from "../../services/parcelService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateParcel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);

  const [formData, setFormData] = useState({
    senderName: user?.name || "",
    senderEmail: user?.email || "",
    senderPhone: "",
    senderAddress: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    weight: "",
    parcelType: "Document",
    description: "",
    deliveryMethod: "Standard",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        sender: {
          name: formData.senderName,
          email: formData.senderEmail,
          phone: formData.senderPhone,
          address: formData.senderAddress,
        },
        recipient: {
          name: formData.recipientName,
          email: formData.recipientEmail,
          phone: formData.recipientPhone,
          address: formData.recipientAddress,
        },
        parcelDetails: {
          weight: parseFloat(formData.weight),
          type: formData.parcelType,
          description: formData.description,
        },
        deliveryMethod: formData.deliveryMethod,
      };
      const res = await customerCreateParcel(payload);
      setTrackingResult(res.trackingNumber || res.data?.trackingNumber);
      toast.success("Parcel request submitted successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create parcel");
    } finally {
      setLoading(false);
    }
  };

  if (trackingResult) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-8 custom-scrollbar flex items-center justify-center">
            <div className="max-w-lg w-full text-center">
              <div className="bg-white rounded-[3rem] p-14 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-green-400 to-primary bg-[length:200%] animate-pulse" />
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 text-4xl">
                  <HiOutlineCheckCircle />
                </div>
                <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter mb-4">
                  Parcel Booked!
                </h2>
                <p className="text-gray-500 font-medium mb-10">
                  Your parcel request has been submitted. Keep your tracking ID safe.
                </p>
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl mb-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Tracking ID</p>
                  <p className="text-2xl font-black text-primary tracking-widest">{trackingResult}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate("/customer/track-parcel")}
                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 transition-all"
                  >
                    Track Now
                  </button>
                  <button
                    onClick={() => navigate("/customer/parcels")}
                    className="flex-1 py-4 border-2 border-gray-100 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all"
                  >
                    My Parcels
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 italic">Create Parcel Request</h1>
              <p className="text-gray-500 font-medium">Fill in the details below to book a new delivery.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SENDER DETAILS */}
              <SectionCard
                color="primary"
                icon={<HiOutlineUser />}
                title="Sender Information"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Full Name" name="senderName" value={formData.senderName} onChange={handleChange} placeholder="Your name" required />
                  <FormField label="Phone Number" name="senderPhone" value={formData.senderPhone} onChange={handleChange} placeholder="+977-98XXXXXXXX" required />
                  <div className="md:col-span-2">
                    <FormField label="Email Address" name="senderEmail" type="email" value={formData.senderEmail} onChange={handleChange} disabled />
                  </div>
                  <div className="md:col-span-2">
                    <FormField label="Pickup Address" name="senderAddress" value={formData.senderAddress} onChange={handleChange} placeholder="Street, City, Area..." required textarea />
                  </div>
                </div>
              </SectionCard>

              {/* RECIPIENT DETAILS */}
              <SectionCard color="orange" icon={<HiOutlineLocationMarker />} title="Recipient Information">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Full Name" name="recipientName" value={formData.recipientName} onChange={handleChange} placeholder="Receiver's name" required accentColor="orange" />
                  <FormField label="Phone Number" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} placeholder="+977-98XXXXXXXX" required accentColor="orange" />
                  <div className="md:col-span-2">
                    <FormField label="Email Address" name="recipientEmail" type="email" value={formData.recipientEmail} onChange={handleChange} placeholder="recipient@email.com" required accentColor="orange" />
                  </div>
                  <div className="md:col-span-2">
                    <FormField label="Delivery Address" name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} placeholder="Street, City, Area..." required textarea accentColor="orange" />
                  </div>
                </div>
              </SectionCard>

              {/* PARCEL DETAILS */}
              <SectionCard color="purple" icon={<HiOutlineCube />} title="Parcel Details">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Parcel Type</label>
                    <select
                      name="parcelType" value={formData.parcelType} onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all font-bold text-sm"
                    >
                      {["Document", "Electronics", "Clothing", "Fragile", "Other"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <FormField label="Estimated Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="0.5" required accentColor="purple" />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Delivery Method</label>
                    <select
                      name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all font-bold text-sm"
                    >
                      <option value="Standard">Standard (2-3 Days)</option>
                      <option value="Express">Express (Same Day)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <FormField label="Description / Notes" name="description" value={formData.description} onChange={handleChange} placeholder="Any special instructions..." textarea accentColor="purple" />
                  </div>
                </div>
              </SectionCard>

              {/* SUBMIT */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-gray-900 rounded-[2.5rem] shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white text-3xl">
                    <HiOutlineTruck />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-1">
                      {formData.deliveryMethod} Delivery
                    </p>
                    <p className="text-white font-bold italic">
                      {formData.deliveryMethod === "Express" ? "Same Day Delivery" : "Estimated 2-3 Days"}
                    </p>
                  </div>
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full md:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-primary transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Processing..." : <><span>Book Delivery</span><HiOutlineArrowRight className="text-lg" /></>}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

const colorMap = {
  primary: { bg: "bg-primary", shadow: "shadow-primary/20", ring: "focus:ring-primary/20" },
  orange:  { bg: "bg-orange-500", shadow: "shadow-orange-500/20", ring: "focus:ring-orange-500/20" },
  purple:  { bg: "bg-purple-500", shadow: "shadow-purple-500/20", ring: "focus:ring-purple-500/20" },
};

const SectionCard = ({ color, icon, title, children }) => {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg ${c.shadow}`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-900 italic">{title}</h2>
      </div>
      {children}
    </div>
  );
};

const FormField = ({ label, name, value, onChange, placeholder, required, type = "text", disabled, textarea, accentColor = "primary" }) => {
  const ring = colorMap[accentColor]?.ring || "focus:ring-primary/20";
  const cls = `w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 ${ring} focus:bg-white transition-all font-bold text-sm disabled:text-gray-400 resize-none`;
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows="2" className={cls} required={required} disabled={disabled} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className={cls} required={required} disabled={disabled} />
      )}
    </div>
  );
};

export default CreateParcel;
