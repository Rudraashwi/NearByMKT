import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Headphones } from "lucide-react";

const Contact = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-500 to-blue-100 overflow-hidden pt-32 sm:pt-36">
      {/* 🌈 Animated Background Gradient */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-linear-to-b from-gray-500 to-blue-100 opacity-50 blur-3xl"
      />

      {/* 🌟 Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center mb-16"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-950 mb-4 tracking-wide">
          Get in Touch
        </h1>
        <p className="text-blue-800 text-lg sm:text-xl">
          We’d love to hear from you — let’s make something great together!
        </p>
      </motion.div>

      {/* 📞 Contact Options */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="z-10 grid sm:grid-cols-3 gap-8 w-full max-w-5xl px-6"
      >
        {/* Phone */}
        <ContactCard
          icon={<Phone className="w-10 h-10 text-blue-700 animate-pulse" />}
          title="Call Us"
          description="Talk to our team for support or inquiries."
          info="+91 1800-123-4567"
          link="tel:+9118001234567"
        />

        {/* Email */}
        <ContactCard
          icon={<Mail className="w-10 h-10 text-blue-700 animate-pulse" />}
          title="Email Us"
          description="Send us your feedback, queries, or suggestions."
          info="support@nearbymart.com"
          link="mailto:support@nearbymart.com"
        />

        {/* Customer Support */}
        <ContactCard
          icon={<Headphones className="w-10 h-10 text-blue-700 animate-pulse" />}
          title="Customer Support"
          description="Available 24/7 to help you with your needs."
          info="Chat with our agents"
          link="#"
        />
      </motion.div>

      {/* ✨ Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="z-10 mt-16 text-blue-900 text-center"
      >
        <p>© {new Date().getFullYear()} NearbyMart — All Rights Reserved</p>
        <p className="text-sm text-blue-800 mt-2">
          Designed with 💙
        </p>
      </motion.footer>
    </div>
  );
};

export default Contact;

// 💬 Reusable Contact Card Component
const ContactCard = ({ icon, title, description, info, link }) => {
  return (
    <motion.a
      href={link}
      target={link.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.07,
        y: -6,
        boxShadow: "0 15px 25px rgba(59,130,246,0.3)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative bg-blue/20 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center cursor-pointer group overflow-hidden"
    >
      {/* 🔷 Animated Glow on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-linear-to-b from-gray-500 to-blue-100 rounded-2xl blur-lg z-0"
      />

      <div className="z-10 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-blue-900 mb-2 z-10">{title}</h3>
      <p className="text-blue-800 text-sm mb-4 z-10">{description}</p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="text-blue-100 font-medium bg-gray-600 px-4 py-2 rounded-full z-10"
      >
        {info}
      </motion.div>
    </motion.a>
  );
};
