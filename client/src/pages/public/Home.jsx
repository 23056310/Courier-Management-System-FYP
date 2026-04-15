import React from "react";

const Home = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">
          Next Day Delivery Available
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Fast. Reliable. Trackable. <br />
          Global logistics solutions for the modern world. Ship parcels locally
          or internationally with real-time tracking and guaranteed delivery
          times.
        </p>
        <div className="mt-6 space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Book a Shipment
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
            View Pricing
          </button>
        </div>
        <p className="mt-4 text-yellow-500 font-semibold">
          ★★★★★ Trusted by 10,000+ businesses
        </p>
      </section>

      {/* Tracking Box */}
      <section className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Track Your Shipment</h2>
        <input
          type="text"
          placeholder="Enter tracking ID (e.g., TRK123456789)"
          className="border px-4 py-2 rounded-md w-full mb-4"
        />
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Track Package
        </button>
      </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Domestic Delivery</h3>
            <p className="text-gray-600 mt-2">
              Fast and secure door-to-door delivery within the country. Choose
              from Standard or Express options.
            </p>
            <a href="#" className="text-blue-600 mt-4 block">Explore Details →</a>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">International Shipping</h3>
            <p className="text-gray-600 mt-2">
              Global logistics coverage reaching over 200 countries with customs
              handling and documentation support.
            </p>
            <a href="#" className="text-blue-600 mt-4 block">Explore Details →</a>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Same-Day Delivery</h3>
            <p className="text-gray-600 mt-2">
              Critical, time-sensitive deliveries across major metropolitan
              areas. Pickup within 60 minutes.
            </p>
            <a href="#" className="text-blue-600 mt-4 block">Explore Details →</a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold">Step 1: Book & Pay</h3>
            <p className="text-gray-600 mt-2">
              Enter your parcel details, choose a service, and pay securely online.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold">Step 2: We Pick Up</h3>
            <p className="text-gray-600 mt-2">
              Our courier arrives at your doorstep for a hassle-free collection.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold">Step 3: Safe Delivery</h3>
            <p className="text-gray-600 mt-2">
              Your parcel is tracked every step of the way until it reaches its destination.
            </p>
          </div>
        </div>
        <p className="mt-6 text-gray-500">
          2M+ Parcels Delivered | 200+ Global Locations | 5K+ Active Drivers | 99.9% Service Quality
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Voices of Trust</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <p className="text-gray-600 italic">
              “The real-time tracking is a game-changer for my online business. Customers love the transparency and speed.”
            </p>
            <p className="mt-2 font-semibold">— Sarah Jenkins, E-commerce Owner</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <p className="text-gray-600 italic">
              “Reliable, professional, and consistent. CMS has become our primary logistics partner for all corporate shipping.”
            </p>
            <p className="mt-2 font-semibold">— Michael Chen, Logistics Manager</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <p className="text-gray-600 italic">
              “Same-day delivery actually means same-day! They have saved us multiple times with urgent client documents.”
            </p>
            <p className="mt-2 font-semibold">— Emma Rodriguez, Legal Consultant</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start shipping?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of satisfied customers. Create an account today and manage all your deliveries from a single dashboard.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Create Free Account
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
            Talk to Sales
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;