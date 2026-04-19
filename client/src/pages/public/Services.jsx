import React from "react";
import { 
  HiOutlineTruck, 
  HiOutlineGlobeAlt, 
  HiOutlineClock, 
  HiOutlineShieldCheck,
  HiOutlineSupport,
  HiOutlineCube
} from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ServiceCard = ({ icon, title, description, image }) => (
  <div className="rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all group overflow-hidden flex flex-col">
    <div className="h-48 w-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>
    <div className="p-10 flex-1 flex flex-col">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary text-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 italic">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Elements to match Home */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30 -z-10" />
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -z-10 opacity-10" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-6">
              Our Expertise
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              World-Class Logistics <br />
              <span className="text-primary italic">Solutions.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
              We provide a comprehensive range of logistics and courier solutions 
              to meet your individual and business needs. From local express 
              deliveries to global supply chain management.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
              alt="Logistics Services" 
              className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/10"
            />
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServiceCard 
            icon={<HiOutlineTruck />}
            title="Domestic Delivery"
            image="https://images.unsplash.com/photo-1519003722824-192d992a6059?auto=format&fit=crop&q=80&w=600"
            description="Fast and reliable door-to-door delivery within the country. We cover all major cities with real-time tracking."
          />
          <ServiceCard 
            icon={<HiOutlineGlobeAlt />}
            title="International Shipping"
            image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600"
            description="Global reach through our international network. We handle customs and documentation for your ease."
          />
          <ServiceCard 
            icon={<HiOutlineClock />}
            title="Express Delivery"
            image="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=600"
            description="Time-sensitive shipments delivered with priority. Same-day and next-day options available in select areas."
          />
          <ServiceCard 
            icon={<HiOutlineShieldCheck />}
            title="Secure Cargo"
            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
            description="Special handling for valuable or fragile items. Secured packaging and dedicated transit options."
          />
          <ServiceCard 
            icon={<HiOutlineCube />}
            title="Warehousing"
            image="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=600"
            description="Safe and secure storage solutions for your inventory. Integrated with our delivery network for quick fulfillment."
          />
          <ServiceCard 
            icon={<HiOutlineSupport />}
            title="Full Support"
            image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
            description="Dedicated support team available around the clock to assist you with tracking and logistics planning."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
