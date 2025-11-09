// src/sections/ShowcaseSection.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// IMPORT ASSETS
import img15 from "../assets/15.png";
import img16 from "../assets/16.png";
import img17 from "../assets/17.png";
import img18 from "../assets/18.png";
import img19 from "../assets/14.png";
import img20 from "../assets/11.png";
import img21 from "../assets/9.png";
import videoMkt from "../assets/mktt.mp4";

const ShowcaseSection = () => {
  const navigate = useNavigate();

  // Slideshow images
  const slideshowImages = [img15, img16, img17, img18, img19, img20, img21];

  // Cards data (6 total)
  const cards = [
    { id: 1, title: "Smart Stores", img: img15 },
    { id: 2, title: "Market Insights", img: img16 },
    { id: 3, title: "Vendor Connect", img: img17 },
    { id: 4, title: "Customer Reach", img: img18 },
    { id: 5, title: "Digital Billing", img: img19 },
    { id: 6, title: "Analytics Hub", img: img20 },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-white py-10 overflow-hidden">

      {/* ===== TOP SECTION ===== */}
      <div className="flex flex-wrap md:flex-nowrap w-11/12 max-w-7xl items-center justify-between gap-6 mb-16">

        {/* 🎥 VIDEO LEFT (slightly bigger + shifted) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-[58%] rounded-2xl overflow-hidden shadow-2xl translate-x-[-1%]"
        >
          <video
            src={videoMkt}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[380px] object-cover"
          />
        </motion.div>

        {/* 🧩 6 CARDS RIGHT */}
        <div className="w-full md:w-[42%] grid grid-cols-2 gap-4 h-[380px]">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white/90 backdrop-blur-md text-gray-900 rounded-2xl p-5 shadow-lg overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <motion.img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-all duration-700"
              />

              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm opacity-80">
                  Explore smart {card.title.toLowerCase()} solutions.
                </p>
              </div>

              {/* Explore Button on hover */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex justify-center"
              >
                <button
                  onClick={() => navigate("/explore")}
                  className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-lg shadow hover:bg-blue-700 transition-all"
                >
                  Explore
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== LANDSCAPE SLIDESHOW ===== */}
      <div className="relative w-full h-[16.6vh] mt-6 overflow-hidden rounded-t-2xl shadow-inner">
        {slideshowImages.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt={`slide-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* ✅ DOT INDICATORS */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2 z-20">
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-blue-600 scale-125 shadow-lg"
                  : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
