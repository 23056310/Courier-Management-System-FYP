import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiArrowRight, HiOutlineShieldCheck } from "react-icons/hi";
import { forgetPassword } from "../../services/authService";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from "../../context/SettingsContext";

const ForgetPassword = () => {
  const { settings } = useSettings();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = await forgetPassword(email);
      toast.success("Identity verified! Redirecting to reset...");
      // Redirect directly to reset password page with the token
      if (data.resetToken) {
        navigate(`/reset-password?token=${data.resetToken}`);
      } else {
        toast.error("Internal error: Reset token missing");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify identity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20 mt-10">
        <div className="w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold italic mb-6 shadow-lg shadow-primary/20 overflow-hidden">
              <img
                src={settings?.siteLogo || "/default-avatar.png"}
                alt={`${settings?.siteName || "CourierMS"} Logo`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2 italic tracking-tighter">Forget Password?</h2>
            <p className="text-gray-500 font-medium leading-relaxed px-4">Enter your email address to verify your identity and reset your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                required
                className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 text-sm" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? "Verifying..." : "Verify Identity"}
              {!loading && <HiArrowRight className="text-lg" />}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <Link to="/login" className="text-gray-400 font-bold hover:text-primary transition-colors inline-flex items-center gap-2 uppercase text-[10px] tracking-widest">
              Back to Login <HiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgetPassword;
