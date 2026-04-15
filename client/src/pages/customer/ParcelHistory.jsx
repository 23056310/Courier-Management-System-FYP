import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ParcelHistory() {

  // Dummy data (frontend simulation)
  const parcels = [
    {
      id: "CMS1001",
      tracking: "TRK123456",
      status: "Delivered",
      date: "2026-04-10",
    },
    {
      id: "CMS1002",
      tracking: "TRK789012",
      status: "In Transit",
      date: "2026-04-12",
    },
    {
      id: "CMS1003",
      tracking: "TRK345678",
      status: "Pending",
      date: "2026-04-14",
    },
  ];

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "In Transit":
        return "text-yellow-600";
      case "Pending":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Parcel History
        </h1>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Parcel ID</th>
                <th className="p-4">Tracking ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={index} className="border-t">

                  <td className="p-4 font-medium">
                    {parcel.id}
                  </td>

                  <td className="p-4 text-gray-600">
                    {parcel.tracking}
                  </td>

                  <td className={`p-4 font-semibold ${getStatusColor(parcel.status)}`}>
                    {parcel.status}
                  </td>

                  <td className="p-4 text-gray-600">
                    {parcel.date}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ParcelHistory;