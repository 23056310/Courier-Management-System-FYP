import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Reports() {

  const reportData = {
    totalParcels: 1245,
    delivered: 980,
    inTransit: 180,
    pending: 85,
    revenue: "$45,200",
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Reports & Analytics
        </h1>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-5 gap-6 mb-10">

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-gray-500">Total Parcels</h3>
            <p className="text-2xl font-bold text-blue-600">
              {reportData.totalParcels}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-gray-500">Delivered</h3>
            <p className="text-2xl font-bold text-green-600">
              {reportData.delivered}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-gray-500">In Transit</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {reportData.inTransit}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-red-600">
              {reportData.pending}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold text-purple-600">
              {reportData.revenue}
            </p>
          </div>

        </div>

        {/* DELIVERY PERFORMANCE BAR */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">

          <h2 className="text-xl font-bold mb-4">
            Delivery Performance Overview
          </h2>

          {/* SIMPLE BARS */}
          <div className="space-y-4">

            <div>
              <p className="text-gray-600">Delivered (80%)</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-green-500 h-3 rounded w-[80%]"></div>
              </div>
            </div>

            <div>
              <p className="text-gray-600">In Transit (15%)</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-yellow-500 h-3 rounded w-[15%]"></div>
              </div>
            </div>

            <div>
              <p className="text-gray-600">Pending (5%)</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-red-500 h-3 rounded w-[5%]"></div>
              </div>
            </div>

          </div>

        </div>

        {/* INSIGHTS */}
        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-bold mb-4">
            Key Insights
          </h2>

          <ul className="space-y-3 text-gray-600">

            <li>📦 Delivery rate increased by 12% this month</li>
            <li>🚚 Driver efficiency improved in urban zones</li>
            <li>📉 Pending parcels reduced by 8%</li>
            <li>⭐ Customer satisfaction rating: 4.8/5</li>

          </ul>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Reports;