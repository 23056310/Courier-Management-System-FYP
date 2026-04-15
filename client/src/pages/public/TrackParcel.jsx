import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);

  // Dummy tracking data (frontend only)
  const handleTrack = () => {
    if (!trackingId) return;

    setResult({
      trackingId: trackingId,
      status: "In Transit",
      sender: "Kathmandu Office",
      receiver: "Pokhara Branch",
      estimatedDelivery: "2 Days",
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">

        {/* HERO */}
        <section className="text-center px-6 py-16 bg-gray-50">
          <h1 className="text-4xl font-bold text-blue-600">
            Track Your Parcel
          </h1>
          <p className="mt-3 text-gray-600">
            Enter your tracking ID to get real-time shipment updates.
          </p>
        </section>

        {/* TRACK BOX */}
        <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 -mt-10 relative z-10">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g. CMS123456)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="border w-full px-4 py-2 rounded-md"
            />

            <button
              onClick={handleTrack}
              className="bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700"
            >
              Track
            </button>
          </div>
        </section>

        {/* RESULT SECTION */}
        {result && (
          <section className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-sm">

            <h2 className="text-2xl font-bold mb-4">
              Tracking Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700">

              <div>
                <p><b>Tracking ID:</b> {result.trackingId}</p>
                <p><b>Sender:</b> {result.sender}</p>
                <p><b>Receiver:</b> {result.receiver}</p>
              </div>

              <div>
                <p><b>Status:</b> {result.status}</p>
                <p><b>Estimated Delivery:</b> {result.estimatedDelivery}</p>
              </div>

            </div>

            {/* STATUS TIMELINE */}
            <div className="mt-8">
              <h3 className="font-bold mb-3">Delivery Progress</h3>

              <div className="flex justify-between text-sm text-gray-600">

                <div className="text-green-600 font-semibold">Booked</div>
                <div className="text-green-600 font-semibold">Dispatched</div>
                <div className="text-blue-600 font-semibold">In Transit</div>
                <div>Out for Delivery</div>
                <div>Delivered</div>

              </div>

            </div>

          </section>
        )}

      </div>

      <Footer />
    </>
  );
}

export default TrackParcel;