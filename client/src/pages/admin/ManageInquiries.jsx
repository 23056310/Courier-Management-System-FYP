
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import {
  getAllInquiries,
  respondInquiry,
  deleteInquiry,
} from "../../services/inquiryService";

export default function ManageInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inquiries from backend
  const fetchInquiries = async () => {
    try {
      const data = await getAllInquiries();
      setInquiries(data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Delete inquiry
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteInquiry(id);
        setInquiries(inquiries.filter((inq) => inq._id !== id));
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Failed to delete inquiry");
      }
    }
  };

  // Respond to inquiry (send email)
  const handleRespond = async (id, email) => {
    const message = prompt(`Write your email reply for: ${email}`);

    if (!message) return;

    try {
      await respondInquiry(id, message);
      alert("Response email sent successfully!");

      // Update UI
      setInquiries(
        inquiries.map((inq) =>
          inq._id === id ? { ...inq, status: "Responded" } : inq
        )
      );
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to send response");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Topbar />

        <section className="p-6">
          <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>

          {loading ? (
            <p className="text-gray-600">Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <p className="text-gray-600">No inquiries found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-left">Subject</th>
                    <th className="py-3 px-6 text-left">Message</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {inquiries.map((inq) => (
                    <tr
                      key={inq._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{inq.name}</td>
                      <td className="py-3 px-6">{inq.email}</td>
                      <td className="py-3 px-6">{inq.phone}</td>
                      <td className="py-3 px-6">{inq.subject}</td>
                      <td className="py-3 px-6">{inq.message}</td>

                      <td className="py-3 px-6 text-center">
                        {inq.status === "Pending" ? (
                          <span className="text-yellow-600 font-semibold">
                            {inq.status}
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            {inq.status}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-6 flex justify-center gap-2">
                        {/* Respond Button */}
                        <button
                          onClick={() => handleRespond(inq._id, inq.email)}
                          disabled={inq.status === "Responded"}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-white ${
                            inq.status === "Responded"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 transition"
                          }`}
                        >
                          <FaEnvelope /> Respond
                        </button>
                     

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
