import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Logo + Description */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <img src="/default-avatar.png" alt="Courier MS Logo" className="h-8 w-8" />
            <h2 className="text-white font-bold text-lg">Courier MS</h2>
          </div>
          <p>Reliable and fast delivery services for your business and personal needs.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul>
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/services" className="hover:text-blue-400">Our Services</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold">Connect With Us</h3>
          <p>📞 +977-123456789</p>
          <p>✉️ support@courierms.com</p>
          <p>🌐 Follow us on social media</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-6">
        © 2026 Courier Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;