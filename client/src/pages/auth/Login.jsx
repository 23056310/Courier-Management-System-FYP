import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Login to Courier MS
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Access your dashboard and track shipments in real-time
          </p>

          {/* FORM */}
          <form className="space-y-4">

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-2 rounded-md"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-md"
            />

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          {/* LINKS */}
          <div className="flex justify-between mt-4 text-sm">
            <a href="/register" className="text-blue-600 hover:underline">
              Create account
            </a>

            <a href="#" className="text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* INFO */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Secure login for Customers, Drivers, and Admins
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Login;