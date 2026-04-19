import React from "react";
import { HiOutlineUserGroup, HiOutlineLightBulb, HiOutlineBadgeCheck } from "react-icons/hi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSettings } from "../../context/SettingsContext";

const About = () => {
  const { settings } = useSettings();
  const siteName = settings?.siteName || "CourierMS";

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
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              Empowering Global <br />
              <span className="text-primary italic">Connections.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
              {siteName} started with a simple goal: to make logistics effortless. Today, 
              we are a leading platform connecting thousands of businesses and individuals 
              through a smart, reliable, and secure courier network.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
              alt={`${siteName} Team`} 
              className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/10"
            />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <ValueCard 
            icon={<HiOutlineUserGroup />}
            title="Customer Centric"
            desc="Every feature we build is designed with our users in mind, ensuring ease of use and maximum transparency."
          />
          <ValueCard 
            icon={<HiOutlineLightBulb />}
            title="Innovative Solutions"
            desc="We leverage the latest technology to optimize routes and provide real-time updates for every shipment."
          />
          <ValueCard 
            icon={<HiOutlineBadgeCheck />}
            title="Unmatched Security"
            desc="Safety isn't just a promise; it's our foundation. We use role-based access and encrypted protocols."
          />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-900 py-24 px-6 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-12 uppercase italic tracking-tighter">Our Core Ideologies</h2>
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To provide a reliable and efficient courier system that reduces manual work,
                  improves delivery speed, and ensures real-time tracking for customers.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To become a fully digital logistics platform that enhances global delivery
                  systems with automation, transparency, and smart tracking technologies.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="space-y-8">
                <p className="text-2xl font-medium leading-relaxed italic">
                  "Logistics is no longer just about moving boxes; it's about moving 
                  the world forward through data and dedication."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full shadow-lg shadow-primary/20" />
                  <div>
                    <p className="font-bold flex items-center gap-2">{siteName} Founders <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full">Core Team</span></p>
                    <p className="text-sm text-gray-500 uppercase font-black tracking-widest">Global Logistics Leaders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION MOCKUP */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 uppercase italic">The Minds Behind {siteName}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="group"
            >
              <div className="aspect-square bg-gray-100 rounded-[2.5rem] mb-6 overflow-hidden relative border border-gray-100 shadow-sm transition-all group-hover:shadow-2xl">
                <img 
                  src={`https://i.pravatar.cc/300?img=${i + 15}`} 
                  alt="Team Member" 
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
              <h4 className="font-black text-lg text-gray-900 group-hover:text-primary transition-colors tracking-tighter uppercase italic">Lead {i === 1 ? 'Architect' : i === 2 ? 'Security' : i === 3 ? 'Operations' : 'Dev'}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{siteName} Core Team</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const ValueCard = ({ icon, title, desc }) => (
  <div
    className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 hover:-translate-y-2"
  >
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl mb-8">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default About;