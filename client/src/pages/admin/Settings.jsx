import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { HiOutlineSave, HiOutlineGlobeAlt, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCamera } from "react-icons/hi";

const Settings = () => {
  const [settings, setSettings] = useState({
    websiteName: "Courier Management System",
    email: "support@courierms.com",
    phone: "+977 9800000000",
    address: "Kathmandu, Nepal",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // This will be connected to the backend later
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">System Settings</h1>
               <p className="text-gray-500 font-medium">Configure global platform details and contact information.</p>
            </div>
            <button 
              onClick={handleSave}
              className="px-10 py-4 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 text-sm"
            >
              <HiOutlineSave className="text-lg" /> Save Changes
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* MAIN SETTINGS */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 italic">General Configuration</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <SettingInput 
                    label="Website Name" 
                    icon={<HiOutlineGlobeAlt />} 
                    name="websiteName"
                    value={settings.websiteName}
                    onChange={handleChange}
                  />
                  <SettingInput 
                    label="Support Email" 
                    icon={<HiOutlineMail />} 
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                  <SettingInput 
                    label="Contact Number" 
                    icon={<HiOutlinePhone />} 
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                  />
                  <SettingInput 
                    label="Physical Address" 
                    icon={<HiOutlineLocationMarker />} 
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* LOGO MANAGEMENT */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-8 italic">Logo Management</h3>
                <div className="flex flex-col md:flex-row items-center gap-10">
                   <div className="relative group">
                     <div className="w-40 h-40 rounded-full border-4 border-gray-50 overflow-hidden shadow-2xl relative">
                        <img 
                          src="/default-avatar.png" 
                          alt="Logo Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                           <HiOutlineCamera className="text-3xl" />
                        </div>
                     </div>
                     <div className="absolute -bottom-2 -right-2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <HiOutlineSave />
                     </div>
                   </div>
                   <div className="flex-1 text-center md:text-left">
                      <h4 className="font-bold text-gray-900 mb-2">Platform Branding</h4>
                      <p className="text-sm text-gray-400 leading-relaxed mb-6">This logo will appear in the Navbar, Email Templates, and PDF Reports. Recommended size: 512x512px.</p>
                      <button className="px-6 py-3 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm">Upload New Logo</button>
                   </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR INFO */}
            <div className="space-y-10">
               <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                  <h4 className="text-lg font-bold mb-6 italic tracking-widest uppercase">System Status</h4>
                  <div className="space-y-6">
                     <StatusItem label="API Version" value="v1.0.4 - STABLE" color="text-green-400" />
                     <StatusItem label="Database" value="MONGODB CLUSTER" color="text-yellow-400" />
                     <StatusItem label="Frontend" value="REACT + VITE" color="text-blue-400" />
                     <StatusItem label="Environment" value="PRODUCTION" color="text-red-400" />
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/10 text-center">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Last Updated Today at 10:45 AM</p>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SettingInput = ({ label, icon, type = "text", name, value, onChange }) => (
  <div className="relative">
    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">
        {icon}
      </div>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 text-sm" 
      />
    </div>
  </div>
);

const StatusItem = ({ label, value, color }) => (
  <div className="flex justify-between items-center">
     <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{label}</span>
     <span className={`text-[10px] font-black uppercase ${color} tracking-widest`}>{value}</span>
  </div>
);

export default Settings;