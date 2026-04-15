import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">

        {/* HERO SECTION */}
        <section
          className="relative h-[60vh] flex items-center justify-center text-center text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="relative z-10 px-6">
            <h1 className="text-4xl font-bold">About Our Courier System</h1>
            <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
              A modern digital solution for fast, secure, and reliable parcel delivery
              with real-time tracking and smart management.
            </p>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            The Courier Management System (CMS) is a web-based platform designed to
            simplify logistics operations. It connects customers, drivers, and administrators
            in a single system, ensuring fast delivery, transparency, and efficient tracking.
          </p>
        </section>

        {/* MISSION & VISION */}
        <section className="px-6 py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To provide a reliable and efficient courier system that reduces manual work,
                improves delivery speed, and ensures real-time tracking for customers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To become a fully digital logistics platform that enhances global delivery
                systems with automation, transparency, and smart tracking technologies.
              </p>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">

            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">🚚 Fast Delivery</h3>
              <p className="text-gray-600 mt-2">
                Optimized delivery system ensures quick parcel delivery.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">📦 Real-Time Tracking</h3>
              <p className="text-gray-600 mt-2">
                Track your parcel anytime with live status updates.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">🔐 Secure System</h3>
              <p className="text-gray-600 mt-2">
                Role-based access ensures full system security.
              </p>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default About;