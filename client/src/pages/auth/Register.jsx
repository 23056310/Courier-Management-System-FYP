import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiArrowRight, HiOutlineIdentification } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20 mt-10">
        <div
          className="w-full max-w-[560px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold italic mb-6 shadow-lg shadow-primary/20 overflow-hidden"
            >
              <img
                src="/default-avatar.png"
                alt="Courier MS Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 italic">Get Started.</h2>
            <p className="text-gray-500">Create your account and start shipping today.</p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                />
              </div>
              <div className="relative">
                <HiOutlineIdentification className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <select className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm text-gray-500 appearance-none">
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
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span>
                  I agree to the <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Terms of Service</span> and <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">Privacy Policy</span>.
                </span>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3">
              Create Account <HiArrowRight className="text-xl" />
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
