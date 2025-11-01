import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Globe, Star, ChevronDown } from "lucide-react";

const About = () => {
  const [active, setActive] = useState(null);

  const features = [
    {
      title: "Local Store Discovery",
      details:
        "Easily find shops, services, and businesses around you. Our smart filters help you explore by category, distance, or rating.",
    },
    {
      title: "Easy Online Ordering",
      details:
        "Order from nearby stores directly through the app. No long queues — just quick, seamless purchases.",
    },
    {
      title: "Real-time Tracking",
      details:
        "Track your orders live and know exactly when your delivery will arrive — accurate to the minute.",
    },
    {
      title: "Secure Payments",
      details:
        "Your safety matters. Enjoy encrypted and verified transactions with top-tier payment gateways.",
    },
    {
      title: "Exclusive Deals",
      details:
        "Save money with local discounts, festive offers, and loyalty rewards tailored to your shopping habits.",
    },
    {
      title: "Community Support",
      details:
        "Support local vendors, connect with your neighborhood, and grow a stronger community together.",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center py-[10rem] px-4">
      {/* 🌟 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-blue-900 mb-3 tracking-wide"
          whileHover={{ scale: 1.05 }}
        >
          NearbyMart
        </motion.h1>
        <p className="text-lg sm:text-xl text-blue-800">
          Your Local Shopping Companion — Version 2.1.0
        </p>
      </motion.div>

      {/* ✨ Key Features */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-10"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <Star className="text-yellow-500" /> Key Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-blue-800">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(59,130,246,0.15)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-4 rounded-xl text-center font-medium shadow-sm hover:shadow-md cursor-pointer transition-all relative bg-white/60"
            >
              <div className="flex justify-center items-center gap-2">
                {feature.title}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    active === i ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Animated Details */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 text-sm text-blue-900 bg-blue-100/70 rounded-xl p-3 shadow-inner"
                  >
                    {feature.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 💬 About Us */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/70 rounded-2xl shadow-lg p-8 mb-10"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-4">About Us</h2>
        <p className="text-blue-800 leading-relaxed text-lg">
          NearbyMart connects you with local stores in your neighborhood.
          Discover, shop, and support local businesses with just a few taps.
          We’re committed to making your shopping experience seamless,
          convenient, and community-focused.
        </p>
      </motion.section>

      {/* 📞 Contact Info */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/70 rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Get in Touch</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-blue-800">
          <ContactCard
            icon={<Mail className="text-blue-700 w-6 h-6" />}
            title="Email"
            text="support@nearbymart.com"
            link="mailto:support@nearbymart.com"
          />
          <ContactCard
            icon={<Phone className="text-blue-700 w-6 h-6" />}
            title="Phone"
            text="+91 1800-123-4567"
            link="tel:+9118001234567"
          />
          <ContactCard
            icon={<Globe className="text-blue-700 w-6 h-6" />}
            title="Website"
            text="www.nearbymart.com"
            link="https://www.nearbymart.com"
          />
        </div>
      </motion.section>

      {/* ⚖️ Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mt-10 text-blue-800 text-sm"
      >
        <p>© {new Date().getFullYear()} NearbyMart — All Rights Reserved</p>
        <div className="flex justify-center gap-4 mt-2 text-blue-700 font-medium">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </motion.footer>
    </div>
  );
};

// 📞 Reusable Contact Card Component
const ContactCard = ({ icon, title, text, link }) => (
  <motion.a
    whileHover={{ scale: 1.05, backgroundColor: "rgba(59,130,246,0.15)" }}
    href={link}
    target={link.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow hover:shadow-md transition-all cursor-pointer"
  >
    {icon}
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm">{text}</p>
    </div>
  </motion.a>
);

export default About;
