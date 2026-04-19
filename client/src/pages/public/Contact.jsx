import React, { useState } from "react";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineClock
} from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { submitInquiry } from "../../services/inquiryService";
import { toast } from "react-hot-toast";

import { useSettings } from "../../context/SettingsContext";

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitInquiry(formData);
      toast.success("Inquiry submitted! Our team will contact you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden pt-8 bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-6 italic">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tighter">
            We're Here For <span className="text-primary italic">You.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about a delivery or our services? Our team is available 24/7 to help you navigate your logistics needs.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Details & Info */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-black mb-10 italic text-gray-900 uppercase tracking-widest text-sm">Contact Information</h2>
              <div className="space-y-10">
                <ContactInfoItem 
                  icon={<HiOutlineLocationMarker />}
                  title="Main Headquarters"
                  text={settings.siteAddress || "New Baneshwor, Kathmandu, Nepal"}
                />
                <ContactInfoItem 
                  icon={<HiOutlinePhone />}
                  title="Direct Support Line"
                  text={settings.sitePhone || "+977-9800000000"}
                />
                <ContactInfoItem 
                  icon={<HiOutlineMail />}
                  title="Official Email"
                  text={settings.siteEmail || "support@courierms.com"}
                />
                <ContactInfoItem 
                  icon={<HiOutlineClock />}
                  title="Operating Hours"
                  text="Open 24/7 for your convenience"
                />
              </div>
            </div>

            <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
               <h3 className="text-2xl font-black mb-4 italic">Emergency Delivery?</h3>
               <p className="text-primary-100 mb-8 opacity-80 leading-relaxed font-medium">If you have an urgent international shipment or a critical delayed parcel, call our priority hotline immediately.</p>
               <button className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-lg">
                 Priority Support
               </button>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 md:p-12 shadow-sm">
            <h3 className="text-2xl font-black mb-8 italic">Send Us a <span className="text-primary">Message.</span></h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com" 
                    className="input-field" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+977-98..." 
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="How can we help?" 
                    className="input-field" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Your Message</label>
                <textarea 
                  rows="6" 
                  required
                  placeholder="Write your message here..." 
                  className="input-field resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>

        </div>

        {/* GOOGLE MAP */}
        <div className="h-[500px] w-full bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-4">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.927035132544!2d85.33146059999999!3d27.6946849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c5997b%3A0x69680a6d36e8b4e7!2sNew%20Baneshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '2rem' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const ContactInfoItem = ({ icon, title, text }) => (
  <div className="flex gap-6 group">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary text-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{title}</h4>
      <p className="text-gray-900 font-bold text-lg">{text}</p>
    </div>
  </div>
);

export default Contact;