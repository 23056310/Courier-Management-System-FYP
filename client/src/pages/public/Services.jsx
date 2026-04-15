import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Services = () => {
  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen">

        {/* HERO SECTION */}
        <section className="text-center px-6 py-16 bg-gray-50">
          <h1 className="text-4xl font-bold text-blue-600">
            Professional Logistics Solutions
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            Shipping solutions tailored for your needs. From local express deliveries
            to global logistics, we ensure safe and timely parcel delivery.
          </p>

          <div className="mt-6 space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Get a Quote
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
              Contact Sales
            </button>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section className="px-6 py-16 grid md:grid-cols-3 gap-8">

          {/* Domestic */}
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Domestic Delivery</h3>
            <p className="text-gray-600 mt-2">
              Reliable nationwide delivery with secure handling.
            </p>

            <ul className="mt-3 text-sm text-gray-500 space-y-1">
              <li>✓ 2–3 day delivery</li>
              <li>✓ Local courier network</li>
              <li>✓ Free pickup service</li>
              <li>✓ Basic insurance</li>
            </ul>

            <p className="mt-3 font-semibold">From $9.99</p>
          </div>

          {/* International */}
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">International Shipping</h3>
            <p className="text-gray-600 mt-2">
              Global delivery with customs support.
            </p>

            <ul className="mt-3 text-sm text-gray-500 space-y-1">
              <li>✓ 200+ countries</li>
              <li>✓ Customs assistance</li>
              <li>✓ End-to-end tracking</li>
              <li>✓ Express options</li>
            </ul>

            <p className="mt-3 font-semibold">From $45.00</p>
          </div>

          {/* Same Day */}
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Same-Day Delivery</h3>
            <p className="text-gray-600 mt-2">
              Urgent deliveries within hours.
            </p>

            <ul className="mt-3 text-sm text-gray-500 space-y-1">
              <li>✓ 2–4 hour delivery</li>
              <li>✓ Live tracking</li>
              <li>✓ Priority courier</li>
              <li>✓ Instant confirmation</li>
            </ul>

            <p className="mt-3 font-semibold">From $24.99</p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-gray-50 py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div>
              <h3 className="font-bold">Punctuality</h3>
              <p className="text-gray-600 text-sm">
                99.9% on-time delivery rate
              </p>
            </div>

            <div>
              <h3 className="font-bold">Security</h3>
              <p className="text-gray-600 text-sm">
                Safe handling of all parcels
              </p>
            </div>

            <div>
              <h3 className="font-bold">Global Reach</h3>
              <p className="text-gray-600 text-sm">
                200+ international destinations
              </p>
            </div>

            <div>
              <h3 className="font-bold">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Always available assistance
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <h2 className="text-3xl font-bold">
            Ready to send your parcel?
          </h2>

          <p className="text-gray-600 mt-3">
            Join thousands of satisfied customers using our courier system.
          </p>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
            Create Free Account
          </button>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default Services;