import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* LOGO + DESCRIPTION */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center space-x-3 group mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform overflow-hidden">

            <img
              src="/default-avatar.png"
              alt="Courier MS Logo"
              className="w-full h-full object-cover"
            />

          </div>
            <h2 className="text-gray-900 font-bold text-2xl tracking-tight">
              Courier<span className="text-primary italic">MS</span>
            </h2>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Revolutionizing logistics with smart tracking, secure handling, and 
            global reach. Your trusted partner for seamless deliveries.
          </p>
          <div className="flex space-x-3">
            <SocialIcon icon={<FaFacebookF />} color="hover:bg-blue-600" />
            <SocialIcon icon={<FaTwitter />} color="hover:bg-sky-500" />
            <SocialIcon icon={<FaInstagram />} color="hover:bg-pink-600" />
            <SocialIcon icon={<FaLinkedinIn />} color="hover:bg-blue-700" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-gray-900 font-bold mb-8 uppercase text-xs tracking-[0.2em]">Services</h3>
          <ul className="space-y-4">
            <FooterLink to="/services">Domestic Delivery</FooterLink>
            <FooterLink to="/services">International Shipping</FooterLink>
            <FooterLink to="/services">Expedited Cargo</FooterLink>
            <FooterLink to="/services">Same Day Pickup</FooterLink>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-gray-900 font-bold mb-8 uppercase text-xs tracking-[0.2em]">Company</h3>
          <ul className="space-y-4">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact Support</FooterLink>
            <FooterLink to="/track-parcel">Track Your Parcel</FooterLink>
            <FooterLink to="/register">Become a Driver</FooterLink>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-gray-900 font-bold mb-8 uppercase text-xs tracking-[0.2em]">Get in Touch</h3>
          <div className="space-y-4">
            <ContactItem 
              icon={<HiOutlinePhone />} 
              text="+977-9800000000" 
            />
            <ContactItem 
              icon={<HiOutlineMail />} 
              text="support@courierms.com" 
            />
            <ContactItem 
              icon={<HiOutlineLocationMarker />} 
              text="New Baneshwor, Kathmandu" 
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 border-t border-gray-100 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
        <p className="order-2 md:order-1">
          © 2026 <span className="text-gray-900 font-bold">Courier Management System</span>. All rights reserved.
        </p>
        <div className="flex space-x-8 order-1 md:order-2">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-500 hover:text-primary transition-colors duration-300 flex items-center group font-medium">
      <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all" />
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, color }) => (
  <a href="#" className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 transition-all duration-300 hover:text-white ${color} hover:-translate-y-1`}>
    <span className="text-base">{icon}</span>
  </a>
);

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center space-x-4 group text-gray-500 ">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
      <span className="text-xl">{icon}</span>
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default Footer;