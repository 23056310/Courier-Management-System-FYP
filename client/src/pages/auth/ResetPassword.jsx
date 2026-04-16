import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiArrowRight, HiOutlineShieldCheck } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Security token is missing. Please request a new reset link.");
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => navigate("/login"), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20 mt-10">
        <div className="w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold italic mb-6 shadow-lg shadow-primary/20 overflow-hidden">
              <img
                src="/default-avatar.png"
                alt="Courier MS Logo"
                className="w-full h-full object-cover"
              />
            </div>
            
            {!submitted ? (
              <>
                <h2 className="text-3xl font-black text-gray-900 mb-2 italic tracking-tighter">Set New Password</h2>
                <p className="text-gray-500 font-medium leading-relaxed px-4">Create a strong, unique password to secure your account.</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                  <HiOutlineShieldCheck />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 italic tracking-tighter">Password Updated</h2>
                <p className="text-gray-500 font-medium leading-relaxed px-4">Your password has been reset successfully. Redirecting you to login...</p>
              </>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100 italic">
              {error}
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password" 
                  required
                  className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 text-sm" 
                />
              </div>

              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password" 
                  required
                  className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 text-sm" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !!error}
                className="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? "Updating..." : "Update Password"}
                {!loading && <HiArrowRight className="text-lg" />}
              </button>
            </form>
          ) : (
            <Link 
              to="/login"
              className="w-full py-5 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-dark transition-all shadow-lg flex items-center justify-center gap-3"
            >
              Sign In Now <HiArrowRight className="text-lg" />
            </Link>
          )}

          {!submitted && (
            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <Link to="/login" className="text-gray-400 font-bold hover:text-primary transition-colors inline-flex items-center gap-2 uppercase text-[10px] tracking-widest">
                Cancel Reset <HiArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;
