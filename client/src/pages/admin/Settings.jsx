import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { 
  HiOutlineSave, 
  HiOutlineGlobeAlt, 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineCamera, 
  HiOutlineRefresh,
  HiOutlineShare,
  HiOutlineAnnotation
} from "react-icons/hi";
import { 
  getSettings, 
  updateSettings, 
  resetSettings 
} from "../../services/websiteSettingsService";
import { useSettings } from "../../context/SettingsContext";
import { toast } from "react-hot-toast";

const Settings = () => {
  const { refreshSettings } = useSettings();
  const [settings, setSettings] = useState({
    siteName: "",
    siteEmail: "",
    sitePhone: "",
    siteAddress: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    footerText: "",
    metaDescription: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
      if (data.siteLogo) setLogoPreview(data.siteLogo);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let dataToSubmit;
      
      if (logoFile) {
        dataToSubmit = new FormData();
        Object.keys(settings).forEach(key => {
          dataToSubmit.append(key, settings[key]);
        });
        dataToSubmit.append("siteLogo", logoFile);
      } else {
        dataToSubmit = settings;
      }

      await updateSettings(dataToSubmit);
      toast.success("Settings updated successfully!");
      fetchSettings(); 
      refreshSettings(); // Sync Global State
      setLogoFile(null);
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all settings to default?")) {
      try {
        const data = await resetSettings();
        setSettings(data.settings);
        setLogoPreview(null);
        refreshSettings(); // Sync Global State
        toast.success("Settings reset to defaults");
      } catch (error) {
        toast.error("Failed to reset settings");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {loading ? (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 italic tracking-tighter uppercase">Platform Master Settings</h1>
                  <p className="text-gray-500 font-medium">Global configuration for your courier management network.</p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleReset}
                    className="px-6 py-4 bg-white text-gray-400 font-black uppercase tracking-[0.2em] rounded-2xl hover:text-red-500 hover:bg-red-50 transition-all text-[10px] border border-gray-100 flex items-center gap-2"
                  >
                    <HiOutlineRefresh /> Reset Defaults
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-10 py-4 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 text-sm disabled:opacity-50"
                  >
                    <HiOutlineSave className="text-lg" /> {saving ? "Saving..." : "Save Configuration"}
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* MAIN SETTINGS */}
                <div className="lg:col-span-2 space-y-10">
                  
                  {/* PRIMARY CONTACT DETAILS */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 italic flex items-center gap-3">
                      <HiOutlineGlobeAlt className="text-primary" /> Core Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <SettingInput 
                        label="Platform Name" 
                        icon={<HiOutlineGlobeAlt />} 
                        name="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                      />
                      <SettingInput 
                        label="Global Support Email" 
                        icon={<HiOutlineMail />} 
                        type="email"
                        name="siteEmail"
                        value={settings.siteEmail}
                        onChange={handleChange}
                      />
                      <SettingInput 
                        label="Headquarters Phone" 
                        icon={<HiOutlinePhone />} 
                        name="sitePhone"
                        value={settings.sitePhone}
                        onChange={handleChange}
                      />
                      <SettingInput 
                        label="Physical Address" 
                        icon={<HiOutlineLocationMarker />} 
                        name="siteAddress"
                        value={settings.siteAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* SOCIAL MEDIA CONNECTIONS */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 italic flex items-center gap-3">
                      <HiOutlineShare className="text-primary" /> Social Media Links
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <SettingInput 
                        label="Facebook URL" 
                        icon={<HiOutlineShare />} 
                        name="facebook"
                        value={settings.facebook}
                        onChange={handleChange}
                        placeholder="https://facebook.com/..."
                      />
                      <SettingInput 
                        label="Twitter URL" 
                        icon={<HiOutlineShare />} 
                        name="twitter"
                        value={settings.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/..."
                      />
                      <SettingInput 
                        label="Instagram URL" 
                        icon={<HiOutlineShare />} 
                        name="instagram"
                        value={settings.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/..."
                      />
                      <SettingInput 
                        label="LinkedIn URL" 
                        icon={<HiOutlineShare />} 
                        name="linkedin"
                        value={settings.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  {/* FOOTER & SEO */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 italic flex items-center gap-3">
                      <HiOutlineAnnotation className="text-primary" /> Footer & Metadata
                    </h3>
                    <div className="space-y-8">
                      <SettingInput 
                        label="Footer Copyright Text" 
                        icon={<HiOutlineAnnotation />} 
                        name="footerText"
                        value={settings.footerText}
                        onChange={handleChange}
                      />
                      <div className="relative">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">SEO Description</label>
                        <textarea 
                          name="metaDescription"
                          value={settings.metaDescription}
                          onChange={handleChange}
                          rows="3"
                          className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 text-sm resize-none"
                          placeholder="Give a short description for search engines..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QUICK ACTIONS & BRANDING */}
                <div className="space-y-10">
                  {/* BRANDING PREVIEW */}
                  <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/40 transition-colors"></div>
                      <h4 className="text-lg font-bold mb-10 italic tracking-widest uppercase flex items-center gap-2">
                        <HiOutlineCamera className="text-primary" /> Branding
                      </h4>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <div className="w-32 h-32 rounded-3xl border-4 border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm flex items-center justify-center relative group">
                            <img 
                              src={logoPreview || "/default-avatar.png"} 
                              alt="Platform Logo" 
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <label className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                              <HiOutlineCamera className="text-2xl" />
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleLogoChange}
                              />
                            </label>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6 leading-relaxed">
                          This brand identity will be synchronized across all modules.
                        </p>
                        <label className="w-full py-4 bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer text-center block">
                          Update Logo Asset
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                      </div>
                  </div>

                  {/* QUICK HELP */}
                  <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10">
                      <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2 italic">
                        <HiOutlineAnnotation className="text-primary" /> System Guide
                      </h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Changes made here will affect the public **Navbar**, **Footer**, **Email Notifications**, and **Invoice Details**.
                      </p>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed mt-4 italic">
                        *Tip: Use full URLs (https://) for social links.*
                      </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const SettingInput = ({ label, icon, type = "text", name, value, onChange, placeholder = "" }) => (
  <div className="relative">
    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">
        {icon}
      </div>
      <input 
        type={type} 
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-gray-900 text-sm placeholder:text-gray-300" 
      />
    </div>
  </div>
);

export default Settings;