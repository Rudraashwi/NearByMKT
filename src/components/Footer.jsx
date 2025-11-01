import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-linear-to-br from-blue-800 via-blue-700 to-blue-600 text-white py-16 px-6 md:px-20 overflow-hidden">
      {/* 💠 Background subtle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_40%)]"
      />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* 🏢 About Section */}
        <FooterSection title="About">
          <FooterLink text="About Us" onClick={() => navigate("/about")} />
          <FooterLink text="Our Services" onClick={() => navigate("/services")} />
          <FooterLink text="Careers" onClick={() => navigate("/careers")} />
          <FooterLink text="Privacy Policy" onClick={() => navigate("/privacy-policy")} />
        </FooterSection>

        {/* 💬 Help Section */}
        <FooterSection title="Help">
          <FooterLink text="Payments" onClick={() => navigate("/help/payments")} />
          <FooterLink text="Shipping" onClick={() => navigate("/help/shipping")} />
          <FooterLink text="Returns" onClick={() => navigate("/help/returns")} />
          <FooterLink text="FAQ" onClick={() => navigate("/faq")} />
        </FooterSection>

        {/* 📍 Contact Section */}
        <FooterSection title="Contact">
          <div className="flex items-start space-x-3 mt-2">
            <FaMapMarkerAlt className="w-5 h-5 mt-1 text-white" />
            <p className="text-sm leading-relaxed">
              Ward No. 15, Kutumb Nagar, Etwa, Begusarai, Bihar – 851117
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-3">
            <FaPhoneAlt className="w-5 h-5 text-white" />
            <p className="text-sm">+91 91551 05666</p>
          </div>
        </FooterSection>

        {/* 🌐 Social Links */}
        <FooterSection title="Follow Us">
          <div className="flex space-x-5 mt-4">
            <SocialIcon
              href="https://www.facebook.com/Nearprop"
              icon={<FaFacebookF />}
            />
            <SocialIcon
              href="https://www.instagram.com/nearprop"
              icon={<FaInstagram />}
            />
            <SocialIcon
              href="https://whatsapp.com/channel/0029VbB066PFy72ADpApP924"
              icon={<FaWhatsapp />}
            />
            <SocialIcon
              href="https://youtube.com/@nearprop"
              icon={<FaYoutube />}
            />
          </div>
        </FooterSection>
      </div>

      {/* 🔹 Divider */}
      <div className="relative z-10 mt-10">
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="border-t border-white/40 w-full mb-6"
        />
      </div>

      {/* 🧾 Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col sm:flex-row justify-center items-end text-sm text-white"
      >
        <p>© {new Date().getFullYear()} NearbyMart — All Rights Reserved </p>
        <p className="mt-2 sm:mt-0">- Designed with 💙</p>
      </motion.div>
    </footer>
  );
};

/* 🔹 Reusable Footer Section */
const FooterSection = ({ title, children }) => (
  <div>
    <motion.h3
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-xl font-semibold mb-4 border-b border-white/40 pb-2"
    >
      {title}
    </motion.h3>
    <div className="flex flex-col space-y-2">{children}</div>
  </div>
);

/* 🔹 Footer Links */
const FooterLink = ({ text, onClick }) => (
  <motion.a
    onClick={onClick}
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="text-white text-sm cursor-pointer hover:text-[#001F54] transition-colors duration-300"
  >
    {text}
  </motion.a>
);

/* 🔹 Social Icons */
const SocialIcon = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="p-2 bg-white/20 rounded-full hover:text-[#001F54] text-white transition-all duration-300 shadow-lg"
  >
    {icon}
  </motion.a>
);

export default Footer;
