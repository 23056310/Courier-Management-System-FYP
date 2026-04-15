import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">

        {/* HERO SECTION WITH IMAGE */}
        <section
          className="relative h-[85vh] flex items-center justify-center text-center text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="relative z-10 px-6">
            <h1 className="text-5xl font-bold">
              Fast & Reliable Courier Service
            </h1>

            <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-200">
              Delivering parcels safely across the country with real-time tracking,
              secure handling, and on-time delivery guarantee.
            </p>

            <div className="mt-6 space-x-4">
              <button className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700">
                Book Shipment
              </button>
              <button className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200">
                Track Parcel
              </button>
            </div>
          </div>
        </section>

        {/* TRACKING SECTION */}
        <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 -mt-16 relative z-20">
          <h2 className="text-2xl font-bold text-center mb-4">
            Track Your Parcel
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g. CMS123456)"
              className="border w-full px-4 py-2 rounded-md"
            />
            <button className="bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700">
              Track
            </button>
          </div>
        </section>

        {/* SERVICES SECTION WITH IMAGES */}
        <section className="px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Domestic Delivery</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Fast delivery within the country with secure handling.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">International Shipping</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Ship globally with customs support and tracking.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&w=800&q=80"
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Same Day Delivery</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Urgent deliveries within hours in city areas.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-gray-50 py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div>
              <h3 className="font-bold text-xl">📦 Real-Time Tracking</h3>
              <p className="text-gray-600 mt-2">
                Track your parcel anytime with live updates.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl">⚡ Fast Delivery</h3>
              <p className="text-gray-600 mt-2">
                Optimized routes for quick and safe delivery.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl">🔐 Secure System</h3>
              <p className="text-gray-600 mt-2">
                Role-based access ensures full security.
              </p>
            </div>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="text-center py-16">
          <h2 className="text-3xl font-bold">Start Shipping Today</h2>
          <p className="text-gray-600 mt-3">
            Join our platform and manage all deliveries easily.
          </p>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
            Get Started
          </button>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default Home;