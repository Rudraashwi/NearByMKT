import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import businesses from "../data/businesses.json";

import img9 from "../assets/9.png";
import img10 from "../assets/10.png";
import img11 from "../assets/11.png";
import img12 from "../assets/12.png";
import img13 from "../assets/13.png";
import img14 from "../assets/14.png";
import img15 from "../assets/15.png";
import img16 from "../assets/16.png";
import img17 from "../assets/17.png";
import img18 from "../assets/18.png";

const Directory = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const clothingRef = useRef(null); // 👈 scroll target

  const categories = [
    { name: "All", img: img18 },
    { name: "Grocery", img: img9 },
    { name: "Food", img: img10 },
    { name: "Electronics", img: img11 },
    { name: "Salon", img: img12 },
    { name: "Phone Repair", img: img13 },
    { name: "Restaurant", img: img14 },
    { name: "Bakery", img: img15 },
    { name: "Clothing", img: img16 },
    { name: "Plumber", img: img17 },
  ];

  const filteredData =
    filter === "All"
      ? businesses
      : businesses.filter((b) =>
          b.category.toLowerCase().includes(filter.toLowerCase())
        );

  // 🧭 Scroll to clothing section when video clicked
  const scrollToClothing = () => {
    setFilter("Clothing");
    setTimeout(() => {
      clothingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f9fbff] pt-[2.5cm]">
      {/* 🎬 Video Banner Section */}
      <div className="relative w-full bg-blue-600 overflow-hidden shadow-md cursor-pointer m-1 p-1.5">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          onClick={scrollToClothing}
          className="w-full object-cover"
          style={{
            height: "18vw", // 1/10th of screen width
            minHeight: "120px",
            maxHeight: "180px",
          }}
        >
          <source src="/intory.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Optional subtle overlay effect */}
        <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* 🌟 Category Section */}
      <div className="py-8 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Explore Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4 px-5">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setFilter(cat.name)}
              ref={cat.name === "Clothing" ? clothingRef : null}
              className={`relative cursor-pointer w-28 h-40 rounded-xl shadow-md overflow-hidden
                bg-gradient-to-br from-blue-100 to-blue-200 hover:shadow-xl transition-all duration-300 
                ${
                  filter === cat.name
                    ? "ring-4 ring-blue-500"
                    : "hover:ring-2 hover:ring-blue-400"
                }`}
            >
              <div className="relative w-full h-full group">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundColor: "#dbeafe",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-500">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {cat.name}
                  </p>
                </div>
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-center py-2 rounded-b-xl">
                  <p className="font-semibold text-xs tracking-wide group-hover:font-bold transition-all">
                    {cat.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🏪 Business Cards Section */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((biz) => (
          <motion.div
            key={biz.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/business/${biz.id}`)}
          >
            <img
              src={
                biz.image ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={biz.name}
              className="h-44 w-full object-cover transition-all hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {biz.name}
              </h2>
              <p className="text-sm text-gray-500">{biz.category}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-gray-600 text-sm gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{biz.address.split(",")[1]}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4" /> {biz.rating}
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    biz.status === "Open Now"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {biz.status}
                </span>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
                  View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
