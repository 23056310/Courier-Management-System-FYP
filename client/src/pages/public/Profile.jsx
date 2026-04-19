import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile as updateProfileService, changePassword as changePasswordService } from "../../services/authService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { HiOutlineUser, HiOutlineMail, HiOutlineCamera, HiOutlineLockClosed, HiOutlineCheck, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfilePic(null);
    }
  }, [user]);

  const displayProfilePic = profilePic
    ? URL.createObjectURL(profilePic)
    : user?.profilePic || "/default-avatar.png";

  const handleProfileUpdate = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (profilePic) formData.append("profilePic", profilePic);
      
      const data = await updateProfileService(formData);
      setUser(data.user);
      toast.success(data.message || "Profile updated successfully!");
      setIsEditing(false);
      setProfilePic(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }
    
    try {
      const data = await changePasswordService({ oldPassword, newPassword });
      toast.success(data.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setIsChangingPassword(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 bg-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-4">
            User <span className="text-primary">Account.</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Manage your personal identity & security</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48 opacity-50" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -ml-36 -mb-36 opacity-50" />
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-20 pb-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center sticky top-24">
              <div className="relative group mb-8">
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-gray-50 shadow-xl group-hover:scale-105 transition-all duration-500">
                  <img src={displayProfilePic} alt="Profile" className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white cursor-pointer hover:bg-gray-900 transition-colors">
                    <HiOutlineCamera className="text-2xl" />
                    <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="hidden" />
                  </label>
                )}
              </div>
              
              <h2 className="text-2xl font-black text-gray-900 italic uppercase mb-2">{user?.name}</h2>
              <div className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest mb-8">
                {user?.role || "Global Member"}
              </div>

              <div className="w-full pt-8 border-t border-gray-50 flex flex-col gap-3">
                 <button 
                  onClick={() => { setIsEditing(true); setIsChangingPassword(false); }}
                  className="w-full py-4 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 text-xs"
                 >
                   <HiOutlinePencilAlt className="text-lg" /> Edit Profile
                 </button>
                 <button 
                  onClick={() => { setIsChangingPassword(true); setIsEditing(false); }}
                  className="w-full py-4 bg-white text-gray-900 border-2 border-gray-100 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2 text-xs"
                 >
                   <HiOutlineLockClosed className="text-lg" /> Security
                 </button>
              </div>
            </div>
          </div>

          {/* MAIN FORM AREA */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-gray-200/50 border border-gray-100 h-full">
              {isEditing && (
                <div>
                  <h3 className="text-2xl font-black text-gray-900 italic uppercase mb-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white"><HiOutlineUser /></div>
                    Personal Details
                  </h3>
                  <div className="space-y-8">
                    <ProfileInput label="Full Name" icon={<HiOutlineUser />} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                    <ProfileInput label="Email Address" icon={<HiOutlineMail />} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
                    
                    <div className="flex gap-4 pt-10">
                      <button onClick={handleProfileUpdate} disabled={isSaving} className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-gray-900 transition-all shadow-lg active:scale-95 text-xs flex items-center gap-2">
                        {isSaving ? "Syncing..." : <><HiOutlineCheck /> Save Profile</>}
                      </button>
                      <button onClick={() => setIsEditing(false)} className="px-8 py-4 bg-gray-50 text-gray-500 font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all text-xs">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isChangingPassword && (
                <div>
                  <h3 className="text-2xl font-black text-gray-900 italic uppercase mb-10 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white"><HiOutlineLockClosed /></div>
                    Change Password
                  </h3>
                  <div className="space-y-8">
                    <ProfileInput label="Current Password" icon={<HiOutlineLockClosed />} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="Current Password" />
                    <ProfileInput label="New Password" icon={<HiOutlineLockClosed />} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="New Password" />
                    
                    <div className="flex gap-4 pt-10">
                      <button onClick={handleChangePassword} className="px-12 py-4 bg-gray-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-lg active:scale-95 text-xs">
                        Update Security
                      </button>
                      <button onClick={() => setIsChangingPassword(false)} className="px-8 py-4 bg-gray-50 text-gray-500 font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all text-xs">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!isEditing && !isChangingPassword && (
                <div className="flex flex-col items-center justify-center text-center h-full py-20 grayscale opacity-40">
                   <HiOutlineUser className="text-8xl text-gray-200 mb-6" />
                   <h3 className="text-xl font-black italic uppercase tracking-widest text-gray-400">Profile Dashboard Locked</h3>
                   <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto mt-4">Selective active administrative controls from the left panel to update your identity profile.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

const ProfileInput = ({ label, icon, type = "text", value, onChange, placeholder }) => (
  <div className="relative group">
    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl group-focus-within:scale-110 transition-transform">
        {icon}
      </div>
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-gray-50 rounded-[1.5rem] focus:outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-gray-900 text-sm" 
      />
    </div>
  </div>
);
