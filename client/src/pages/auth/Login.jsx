import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-20 mt-10">
        <div
          className="w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <div
              className="w-16 h-16 rounded-full  mx-auto flex items-center justify-center text-white text-3xl font-bold italic mb-6 shadow-lg shadow-primary/20"
            >
              <img
                src="/default-avatar.png"
                alt="Courier MS Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 italic">Welcome Back.</h2>
            <p className="text-gray-500">Access your logistics control center.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
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
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="group-hover:text-primary transition-colors">Remember me</span>
              </label>
              <Link to="/forget-password" name="forgot-password" className="text-primary font-bold hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3">
              Sign In <HiArrowRight className="text-xl" />
            </button>
          </form>

          <div className=" pt-8 border-t border-gray-100 flex items-center justify-center gap-4 text-center">

            <p className="text-gray-500">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="text-gray-900 font-bold hover:text-primary transition-colors inline-flex items-center gap-2"
            >
              Create a free account <HiArrowRight />
            </Link>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
