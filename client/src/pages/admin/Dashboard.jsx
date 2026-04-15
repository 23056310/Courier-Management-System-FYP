import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex">

        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow-md p-5 hidden md:block">

          <h2 className="text-xl font-bold text-blue-600 mb-6">
            Admin Panel
          </h2>

          <ul className="space-y-4 text-gray-700 font-medium">

            <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">Parcels</li>
            <li className="hover:text-blue-600 cursor-pointer">Drivers</li>
            <li className="hover:text-blue-600 cursor-pointer">Customers</li>
            <li className="hover:text-blue-600 cursor-pointer">Inquiries</li>
            <li className="hover:text-blue-600 cursor-pointer">Settings</li>

          </ul>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">

          {/* HEADER */}
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Admin Dashboard Overview
          </h1>

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Total Parcels</h3>
              <p className="text-2xl font-bold text-blue-600">1,245</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Active Drivers</h3>
              <p className="text-2xl font-bold text-green-600">48</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Customers</h3>
              <p className="text-2xl font-bold text-yellow-500">2,300</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Pending Inquiries</h3>
              <p className="text-2xl font-bold text-red-500">12</p>
            </div>

          </div>

          {/* SYSTEM ACTIVITY */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">

            <h2 className="text-xl font-bold mb-4">
              System Activity
            </h2>

            <ul className="space-y-3 text-gray-600">

              <li>📦 New parcel created by customer CMS1001</li>
              <li>🚚 Driver assigned to shipment CMS1002</li>
              <li>📩 New inquiry received from user</li>
              <li>✔ Parcel CMS1003 delivered successfully</li>

            </ul>

          </div>

          {/* QUICK ACTIONS */}
          <div className="grid md:grid-cols-3 gap-6">

            <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
              + Create Parcel
            </button>

            <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">
              Manage Drivers
            </button>

            <button className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700">
              View Inquiries
            </button>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;