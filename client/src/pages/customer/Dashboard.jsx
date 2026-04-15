import React from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Topbar />

      <div className="min-h-screen bg-gray-50 flex">

        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
          <h2 className="text-xl font-bold text-blue-600 mb-6">
            CMS Panel
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">Parcels</li>
            <li className="hover:text-blue-600 cursor-pointer">Track Parcel</li>
            <li className="hover:text-blue-600 cursor-pointer">Drivers</li>
            <li className="hover:text-blue-600 cursor-pointer">Customers</li>
            <li className="hover:text-blue-600 cursor-pointer">Inquiries</li>
            <li className="hover:text-blue-600 cursor-pointer">Settings</li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">

          {/* HEADER */}
          <h1 className="text-2xl font-bold mb-6">
            Dashboard Overview
          </h1>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Total Parcels</h3>
              <p className="text-2xl font-bold text-blue-600">1,245</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Delivered</h3>
              <p className="text-2xl font-bold text-green-600">980</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">In Transit</h3>
              <p className="text-2xl font-bold text-yellow-500">210</p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">Pending</h3>
              <p className="text-2xl font-bold text-red-500">55</p>
            </div>

          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3 text-gray-600">

              <li>📦 Parcel CMS123456 dispatched from Kathmandu</li>
              <li>🚚 Driver assigned to shipment CMS789012</li>
              <li>📍 Parcel CMS345678 out for delivery</li>
              <li>✔ Parcel CMS987654 delivered successfully</li>

            </ul>

          </div>

        </main>

      </div>

      <Sidebar />
    </>
  );
}

export default Dashboard;