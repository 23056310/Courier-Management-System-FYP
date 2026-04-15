import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">

        {/* HERO SECTION */}
        <section className="text-center px-6 py-16 bg-gray-50">
          <h1 className="text-4xl font-bold text-blue-600">
            Contact Us
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about shipments, tracking, or partnerships?
            Our support team is here to help you 24/7.
          </p>
        </section>

        {/* CONTACT SECTION */}
        <section className="px-6 py-12 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* FORM */}
          <div className="bg-white shadow-md p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-4 py-2 rounded-md"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-4 py-2 rounded-md"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full border px-4 py-2 rounded-md"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

            <p className="text-gray-600 mb-3">
              📍 Address: Kathmandu, Nepal
            </p>

            <p className="text-gray-600 mb-3">
              📞 Phone: +977-9800000000
            </p>

            <p className="text-gray-600 mb-3">
              📧 Email: support@cms.com
            </p>

            <p className="text-gray-600 mb-6">
              ⏰ Working Hours: 24/7 Support Available
            </p>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Quick Support</h3>
              <p className="text-sm text-gray-500">
                For urgent parcel issues, please include your tracking ID in the message.
              </p>
            </div>
          </div>

        </section>

        {/* MAP SECTION (OPTIONAL UI PLACEHOLDER) */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <p className="text-gray-600">
                Google Map Integration (Optional)
              </p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default Contact;