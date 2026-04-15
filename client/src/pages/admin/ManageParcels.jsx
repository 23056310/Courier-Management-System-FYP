import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ManageParcels() {

  const parcels = [
    {
      id: "CMS1001",
      tracking: "TRK123456",
      customer: "John Doe",
      driver: "Ramesh Sharma",
      status: "Delivered",
    },
    {
      id: "CMS1002",
      tracking: "TRK789012",
      customer: "Sarah Khan",
      driver: "Sita Rai",
      status: "In Transit",
    },
    {
      id: "CMS1003",
      tracking: "TRK345678",
      customer: "Ali Raza",
      driver: "Not Assigned",
      status: "Pending",
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

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-blue-600">
            Manage Parcels
          </h1>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create Parcel
          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Parcel ID</th>
                <th className="p-4">Tracking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={index} className="border-t">

                  <td className="p-4 font-medium">
                    {parcel.id}
                  </td>

                  <td className="p-4 text-gray-600">
                    {parcel.tracking}
                  </td>

                  <td className="p-4 text-gray-600">
                    {parcel.customer}
                  </td>

                  <td className="p-4 text-gray-600">
                    {parcel.driver}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(parcel.status)}`}>
                      {parcel.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 space-x-2">

                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>

                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Assign Driver
                    </button>

                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>

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

export default ManageParcels;