import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineShieldExclamation } from "react-icons/hi";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[12rem] md:text-[20rem] font-black text-gray-50 leading-none select-none italic">
          403
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-red-500 rounded-3xl -rotate-12 flex items-center justify-center text-white text-5xl shadow-2xl shadow-red-500/40">
            <HiOutlineShieldExclamation />
          </div>
        </div>
      </div>

      <div className="max-w-xl">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 italic tracking-tighter uppercase">
          Access <span className="text-red-500">Denied.</span>
        </h2>
        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
          You don't have the required administrative clearance to access this terminal. If you believe this is an error, please contact your systems administrator.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-10 py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
          >
            <HiOutlineArrowLeft className="text-lg" /> Return to Base
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-10 py-5 border-2 border-gray-100 text-gray-900 font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-50 transition-all"
          >
            Request Access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
