import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Register() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Join Courier MS and manage your deliveries easily
          </p>

          {/* FORM */}
          <form className="space-y-4">

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-md"
            />

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

            {/* Role Selection */}
            <select className="w-full border px-4 py-2 rounded-md">
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Register;