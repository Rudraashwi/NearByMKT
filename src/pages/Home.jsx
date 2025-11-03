import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import slideshow images
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import HeroVideo from "./HeroVideo";

const images = [img1, img2, img3, img4, img5];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="pt-24 bg-linear-to-b from-gray-950 to-blue-100 min-h-screen overflow-hidden">
      <div id="after-hero">

      <HeroVideo />
      {/* Slideshow */}
      <div className="relative w-full h-[55vh] sm:h-[70vh] overflow-hidden rounded-b-3xl shadow-lg">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover brightness-110"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {/* Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all ${
                index === current
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* 2x2 Grid Section */}
      <motion.div
        className="px-6 sm:px-12 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Card
          variants={cardVariant}
          title="Directory"
          color="from-blue-200 via-gray-600 to-blue-200"
          description="Explore shops, services, and local businesses near you — everything from salons to repair centers."
          buttonText="Explore Directory 🗂️"
          onClick={() => navigate("/directory")}
        />

        <Card
          variants={cardVariant}
          title="Market"
          color="from-blue-200 via-gray-600 to-blue-200"
          description="Find the best local markets offering fresh produce, clothing, electronics, and more."
          buttonText="Explore Market 🏪"
          onClick={() => navigate("/market")}
        />

        <Card
          variants={cardVariant}
          title="Food"
          color="from-blue-200 via-gray-600 to-blue-200"
          description="Discover restaurants, cafes, and food stalls serving your favorite dishes nearby."
          buttonText="Explore Food 🍔"
          onClick={() => navigate("/food")}
        />

        <Card
          variants={cardVariant}
          title="Groceries"
          color="from-blue-200 via-gray-600 to-blue-200"
          description="Get daily essentials and groceries from trusted nearby stores at your fingertips."
          buttonText="Explore Groceries 🛒"
          onClick={() => navigate("/groceries")}
        />
      </motion.div>
      </div>
    </div>
  );
};

// ✅ Card Component
const Card = ({ title, description, buttonText, color, variants, onClick }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
      }}
      className={`bg-linear-to-br ${color} text-white rounded-2xl shadow-lg
                  hover:shadow-2xl transition-all duration-500 p-8 sm:p-10 text-center`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 drop-shadow-md">{title}</h2>
      <p className="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed">{description}</p>
      <motion.button
        onClick={onClick} // ✅ Added click navigation
        whileHover={{
          scale: 1.1,
          backgroundColor: "#fff",
          color: "#2563eb",
          boxShadow: "0 0 15px rgba(255,255,255,0.6)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 220 }}
        className="bg-white/90 text-blue-700 font-semibold px-8 py-2 rounded-full
                   shadow-md hover:bg-white hover:shadow-blue-300/50 transition-all duration-300"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};

export default Home;
