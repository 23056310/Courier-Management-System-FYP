import React from "react";
import { Link } from "react-router-dom";
import { 
  HiOutlineCube, 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineGlobe,
  HiChevronRight,
  HiOutlineSearch
} from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        {/* Background Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30 -z-10" />
        <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -z-10 opacity-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mt-8 px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-6">
              Reliable & Secure Shipping
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              Modern Logistics <br />
              <span className="text-primary italic">Redefined.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Experience the next generation of courier management. Fast, transparent, 
              and global delivery solutions tailored for your business and personal needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary flex items-center gap-2">
                Get Started <HiChevronRight className="text-xl" />
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-2xl font-bold text-gray-900">10k+</h4>
                <p className="text-sm text-gray-500">Parcels Delivered</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <h4 className="text-2xl font-bold text-gray-900">99.9%</h4>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1570225324221-49c73ecca0a2?q=80&w=1000" 
              alt="Global Air Logistics"
              className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/10"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1000";
              }}
            />
           
          </div>
        </div>
      </section>

      

      {/* SERVICES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Logistics Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We offer a wide range of services designed to meet your every shipping need, 
            from local city deliveries to international cargo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<HiOutlineLightningBolt />} 
            title="Express Delivery" 
            desc="Urgent same-day delivery within city limits for your time-sensitive items."
           img="https://images.unsplash.com/photo-1581091215367-59ab6b3f3d7b?w=600"
          />
          <ServiceCard 
            icon={<HiOutlineGlobe />} 
            title="International Shipping" 
            desc="Global reach with simplified customs and door-to-door tracking."
            img="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=600"
          />
          <ServiceCard 
            icon={<HiOutlineCube />} 
            title="Domestic Delivery" 
            desc="Reliable nationwide shipping with guaranteed safety and transparency."
            img="https://images.unsplash.com/photo-1519003722824-192d992a6059?q=80&w=600"
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-900 py-24 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight italic">
                Why Thousands Trust <br />
                Our Courier Network
              </h2>
              <div className="space-y-8">
                <FeatureItem 
                  icon={<HiOutlineShieldCheck />}
                  title="Full Security"
                  desc="Every parcel is insured and handled with extreme care by our certified team."
                />
                <FeatureItem 
                  icon={<HiOutlineLightningBolt />}
                  title="Real-Time Updates"
                  desc="State of the art tracking system that keeps you updated at every milestone."
                />
                <FeatureItem 
                  icon={<HiOutlineGlobe />}
                  title="Global Presence"
                  desc="Operating across 50+ countries with local expertise in every region."
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative inline-block w-full max-w-xl">
                {/* Visual support backdrop */}
                <div className="absolute top-4 left-4 w-full h-full bg-primary/20 rounded-[2.5rem] transform translate-x-2 translate-y-2 opacity-50" />
                
                {/* Main Image */}
                <img 
                  src="https://images.unsplash.com/photo-1570225324221-49c73ecca0a2?q=80&w=800" 
                  alt="Logistics Network"
                  className="relative z-10 rounded-[2.5rem] shadow-2xl border-2 border-white/10 w-full object-cover aspect-[4/3]"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800";
                  }}
                />
                
                {/* Floating decor */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-2xl z-20 shadow-xl flex items-center justify-center text-white text-3xl">
                   <HiOutlineCube />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-8 px-2 text-center">
        <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 md:p-18 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Ready to start shipping?</h2>
            <p className="text-primary-100 mb-10 text-lg opacity-90">
              Join our platform today and experience logistics without limits.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/register" className="px-10 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-gray-50 transition-all hover:scale-105">
                Join Now
              </Link>
              <Link to="/contact" className="px-10 py-4 bg-primary-dark text-white font-bold rounded-2xl hover:bg-primary-900 border border-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const ServiceCard = ({ icon, title, desc, img }) => (
  <div 
    className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 transition-all hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2"
  >
    <div className="h-56 overflow-hidden relative bg-gray-100">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600";
        }}
      />
      <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary text-2xl shadow-lg">
        {icon}
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed mb-6">{desc}</p>
      <Link to="/services" className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
        Learn More <HiChevronRight className="text-xl" />
      </Link>
    </div>
  </div>
);

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex gap-6">
    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary text-3xl shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Home;