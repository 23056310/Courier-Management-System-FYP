import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function MyParcels() {
  const parcels = [
    {
      id: "CMS1001",
      tracking: "TRK123456",
      status: "Delivered",
      date: "2026-04-10",
      receiver: "John Doe",
    },
    {
      id: "CMS1002",
      tracking: "TRK789012",
      status: "In Transit",
      date: "2026-04-12",
      receiver: "Sarah Khan",
    },
    {
      id: "CMS1003",
      tracking: "TRK345678",
      status: "Pending",
      date: "2026-04-14",
      receiver: "Ali Raza",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          My Parcels
        </h1>

        {/* PARCEL GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {parcels.map((parcel, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
            >

              <h2 className="text-lg font-bold text-gray-800">
                {parcel.id}
              </h2>

              <p className="text-gray-600 mt-1">
                Tracking: {parcel.tracking}
              </p>

              <p className="text-gray-600">
                Receiver: {parcel.receiver}
              </p>

              <p className="text-gray-600">
                Date: {parcel.date}
              </p>

              {/* STATUS */}
              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  parcel.status
                )}`}
              >
                {parcel.status}
              </span>

              {/* BUTTON */}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Track Parcel
              </button>

            </div>
          ))}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyParcels;