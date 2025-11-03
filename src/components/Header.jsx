import React from "react";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBell } from "react-icons/fa";  // add bell icon
import useGeoLocation from "../hooks/useGeoLocation";

const Header = () => {
  const location = useGeoLocation();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-200 via-gray-600 to-blue-200 
                 text-white shadow-lg z-50 backdrop-blur-sm"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-wrap items-center justify-between 
                       px-3 sm:px-6 py-3">

        {/* Left: Logo + Title + Location */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <motion.img
            src={logo}
            alt="Near By MKT Logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-[0_4px_8px_rgba(255,255,255,0.25)]
                       group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-lg sm:text-2xl font-extrabold tracking-wide drop-shadow-md whitespace-nowrap text-white"
            >
              Near By MKT
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-200 mt-1 sm:mt-0"
            >
              <FaMapMarkerAlt className="text-white" />
              <span>{ location.error ? "Location unavailable" : location.city || "Detecting..." }</span>
            </motion.div>
          </div>
        </Link>

        {/* Center: Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex-grow mx-4 sm:mx-6 mt-3 sm:mt-0 max-w-md w-full"
        >
          <input
            type="text"
            placeholder="Search for shops, markets, or deals..."
            className="w-full px-5 py-2 sm:py-2.5 rounded-full text-gray-800 
                       bg-white/95 shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                       focus:outline-none focus:ring-2 focus:ring-blue-300 
                       placeholder-gray-500 text-sm sm:text-base"
          />
        </motion.div>

        {/* Notification icon + Right side links + Login */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Notification Icon */}
          <Link to="/notifications" className="relative text-white hover:text-blue-200 transition-all duration-300">
            <FaBell className="text-xl sm:text-2xl" />
            {/* Badge for count */}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center 
                              px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              3
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/about"
              className="text-white text-sm sm:text-base font-medium hover:text-blue-200 transition-all duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white text-sm sm:text-base font-medium hover:text-blue-200 transition-all duration-300"
            >
              Contact
            </Link>
          </div>

          <Link to="/login">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="bg-blue-900 text-gray-100 font-semibold px-5 py-1.5 sm:px-6 sm:py-2 rounded-full 
                         shadow-md border border-blue-300 hover:bg-blue-800 hover:text-gray-100 transition-all duration-300"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
