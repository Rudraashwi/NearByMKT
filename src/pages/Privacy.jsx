import React from "react";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-sky-100 flex justify-center items-start py-16 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl w-full bg-sky-50 rounded-2xl shadow-2xl p-8 sm:p-12"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-3 drop-shadow-md">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">Effective Date: August 1, 2025</p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold text-blue-800">Near By MKT</span>, your privacy is very important to us. 
            This policy explains how we collect, use, and protect your personal information when you use our platform.
          </p>
        </motion.section>

        {/* Information We Collect */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personal info (name, email, contact number)</li>
            <li>Usage data like visited pages and interactions</li>
            <li>Device info, browser type, and cookies</li>
          </ul>
        </motion.section>

        {/* Usage */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            3. How We Use Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use your data to personalize your experience, enhance our services,
            send updates or offers, and ensure security. We never sell your data.
          </p>
        </motion.section>

        {/* Your Rights */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            4. Your Rights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Request access to your stored data</li>
            <li>Ask for correction or deletion of your info</li>
            <li>Opt out from promotional communications</li>
          </ul>
        </motion.section>

        {/* Cookies */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            5. Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies to provide a smoother browsing experience and
            understand usage trends. You can control cookies in your browser settings.
          </p>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            6. Contact Us
          </h2>
          <p className="text-gray-700">
            For questions about this Privacy Policy, contact us at:{" "}
            <a
              href="mailto:support@nearbymkt.com"
              className="text-blue-800 underline hover:text-blue-900 transition-all"
            >
              support@nearbymkt.com
            </a>
          </p>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-600 text-sm mt-10"
        >
          © {new Date().getFullYear()} Near By MKT. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Privacy;
