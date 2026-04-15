import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ManageCustomers() {

  const customers = [
    {
      id: "CUS1001",
      name: "John Doe",
      email: "john@example.com",
      phone: "9800000001",
      status: "Active",
    },
    {
      id: "CUS1002",
      name: "Sarah Khan",
      email: "sarah@example.com",
      phone: "9800000002",
      status: "Inactive",
    },
    {
      id: "CUS1003",
      name: "Ali Raza",
      email: "ali@example.com",
      phone: "9800000003",
      status: "Active",
    },
  ];

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-600";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Manage Customers
        </h1>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Customer ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index} className="border-t">

                  <td className="p-4 font-medium">
                    {customer.id}
                  </td>

                  <td className="p-4">
                    {customer.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {customer.email}
                  </td>

                  <td className="p-4 text-gray-600">
                    {customer.phone}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 space-x-2">

                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      View
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

export default ManageCustomers;