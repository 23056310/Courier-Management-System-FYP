import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiArrowRight, HiOutlineIdentification, HiCamera } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from "../../context/SettingsContext";

const Register = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      const user = await register(data);
      toast.success("Registration successful! Redirecting in 5 seconds...");

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "driver") {
          navigate("/driver/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      }, 5000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20 mt-10">
        <div
          className="w-full max-w-[560px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <div className="relative w-28 h-28 mx-auto mb-8 group">
              <div
                className="w-full h-full rounded-full flex items-center justify-center bg-gray-50 text-white text-3xl font-bold italic shadow-xl shadow-primary/10 overflow-hidden border-4 border-white transition-all group-hover:shadow-primary/20"
              >
                <img
                  src={profilePic ? previewUrl : (settings?.siteLogo || "/default-avatar.png")}
                  alt={`${settings?.siteName || "CourierMS"} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all z-10 border-4 border-white">
                <HiCamera className="text-xl" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase">{settings?.siteName || "CourierMS"} Register</h2>
            <p className="text-gray-500 font-medium">Create your credentials and join our network.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                />
              </div>
              <div className="relative">
                <HiOutlineIdentification className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm text-gray-500 appearance-none"
                >
                  <option value="">Select Role</option>
                  <option value="customer">Customer</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span>
                  I agree to the <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Terms of Service</span> and <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Privacy Policy</span>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"} <HiArrowRight className="text-xl" />
            </button>
          </form>

          <div className=" pt-8  border-t border-gray-100 flex items-center justify-center gap-4 text-center">

            <p className="text-gray-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="text-gray-900 font-bold hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              Sign in to your account <HiArrowRight />
            </Link>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
