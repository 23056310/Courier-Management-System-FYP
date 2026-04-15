import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function ManageInquiries() {

  const inquiries = [
    {
      id: "INQ1001",
      name: "John Doe",
      email: "john@example.com",
      message: "I want to know about international shipping rates.",
      status: "Pending",
    },
    {
      id: "INQ1002",
      name: "Sarah Khan",
      email: "sarah@example.com",
      message: "My parcel is delayed. Please check.",
      status: "Replied",
    },
    {
      id: "INQ1003",
      name: "Ali Raza",
      email: "ali@example.com",
      message: "Do you offer same-day delivery in my area?",
      status: "Pending",
    },
  ];

  const getStatusStyle = (status) => {
    return status === "Replied"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Manage Inquiries
        </h1>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Inquiry ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {inquiries.map((inq, index) => (
                <tr key={index} className="border-t">

                  <td className="p-4 font-medium">
                    {inq.id}
                  </td>

                  <td className="p-4">
                    {inq.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {inq.email}
                  </td>

                  {/* MESSAGE */}
                  <td className="p-4 text-gray-600 max-w-xs truncate">
                    {inq.message}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(inq.status)}`}>
                      {inq.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 space-x-2">

                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                      Reply
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

export default ManageInquiries;