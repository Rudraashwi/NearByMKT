// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBell } from "react-icons/fa";
import useGeoLocation from "../hooks/useGeoLocation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const location = useGeoLocation();
  const router = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setCompact(y > 48);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => window.scrollTo(0, 0), [router.pathname]);

  return (
    <motion.header
      initial={false}
      animate={{ backdropFilter: scrolled ? "saturate(1) blur(6px)" : "none" }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    >
      <div
        className={`w-full max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 py-2 transition-all duration-300
          ${scrolled
            ? "bg-white/30 border-b border-white/10 shadow-sm"
            : "bg-black"
          }
        `}
        style={{ backdropFilter: scrolled ? "blur(6px)" : "none" }}
      >
        {/* LOGO + LOCATION */}
        <Link to="/" className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="logo"
            initial={false}
            animate={{ width: compact ? 36 : 48, height: compact ? 36 : 48 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="object-contain rounded"
          />

          <div
            className={`flex flex-col leading-tight text-white 
            ${compact ? "hidden sm:flex" : "flex"}`}
          >
            <span className="font-extrabold sm:text-lg">Near By MKT</span>

            <div className="text-xs flex items-center gap-1 text-white/70">
              <FaMapMarkerAlt className="text-white/80" />
              <span>
                {location.error
                  ? "Location unavailable"
                  : location.city || "Detecting..."}
              </span>
            </div>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 mx-4 hidden md:block">
          <input
            type="text"
            placeholder="Search for shops, markets, deals..."
            className="w-full rounded-full px-4 py-2 text-sm outline-none bg-white shadow-sm placeholder-gray-600"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Link to="/notifications" className="relative text-white">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-red-100 bg-red-600 rounded-full">
              3
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-4">
            <Link to="/about" className="text-white text-sm hover:text-gray-300">
              About
            </Link>
            <Link to="/contact" className="text-white text-sm hover:text-gray-300">
              Contact
            </Link>
            <Link to="/reels" className="text-white text-sm hover:text-gray-300">
              Reels
            </Link>
          </nav>

          <Link to="/login">
            <button className="bg-blue-900 text-white px-4 py-1.5 rounded-full text-sm shadow hover:bg-blue-800 transition active:scale-95">
              Login
            </button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
