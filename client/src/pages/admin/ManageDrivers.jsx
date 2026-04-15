import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ManageDrivers() {

  const drivers = [
    {
      id: "DRV1001",
      name: "Ramesh Sharma",
      email: "ramesh@example.com",
      phone: "9800000011",
      status: "Active",
      parcels: 5,
    },
    {
      id: "DRV1002",
      name: "Sita Rai",
      email: "sita@example.com",
      phone: "9800000012",
      status: "Busy",
      parcels: 2,
    },
    {
      id: "DRV1003",
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "9800000013",
      status: "Inactive",
      parcels: 0,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Busy":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
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
          Manage Drivers
        </h1>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Driver ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Parcels Assigned</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={index} className="border-t">

                  <td className="p-4 font-medium">
                    {driver.id}
                  </td>

                  <td className="p-4">
                    {driver.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {driver.email}
                  </td>

                  <td className="p-4 text-gray-600">
                    {driver.phone}
                  </td>

                  {/* PARCEL COUNT */}
                  <td className="p-4 font-semibold text-blue-600">
                    {driver.parcels}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 space-x-2">

                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      View
                    </button>

                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Assign
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

export default ManageDrivers;