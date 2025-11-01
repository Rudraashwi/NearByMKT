// src/pages/Food.jsx
import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  CheckCircle,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import foodData from "../data/food.json";

// category icons from assets
import allIcon from "../assets/all.png";
import pizzaIcon from "../assets/pizza.png";
import burgerIcon from "../assets/burger.png";
import chineseIcon from "../assets/chinese.png";
import vegIcon from "../assets/veg.png";
import southIcon from "../assets/south_indian.png";
import northIcon from "../assets/north_indian.png";
import dessertsIcon from "../assets/desserts.png";
import fastfoodIcon from "../assets/fast_food.png";
import italianIcon from "../assets/italian.png";
import thaiIcon from "../assets/thai.png";
import mexicanIcon from "../assets/mexican.png";
import moreIcon from "../assets/more.png";

const parseDistanceKm = (d) => {
  const m = String(d || "").match(/([\d.]+)/);
  return m ? Number(m[1]) : 99;
};
const smoothScroll = (el, dir, px = 320) => {
  if (!el) return;
  el.scrollBy({ left: dir === "left" ? -px : px, behavior: "smooth" });
};

const Food = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const carousels = useRef({});

  const foods = useMemo(
    () =>
      foodData.map((f) => ({
        ...f,
        distanceNum: parseDistanceKm(f.distance),
      })),
    []
  );

  const categories = [
    { name: "All", icon: allIcon },
    { name: "Pizza", icon: pizzaIcon },
    { name: "Burger", icon: burgerIcon },
    { name: "Chinese", icon: chineseIcon },
    { name: "Veg", icon: vegIcon },
    { name: "South Indian", icon: southIcon },
    { name: "North Indian", icon: northIcon },
    { name: "Desserts", icon: dessertsIcon },
    { name: "Fast Food", icon: fastfoodIcon },
    { name: "Italian", icon: italianIcon },
    { name: "Thai", icon: thaiIcon },
    { name: "Mexican", icon: mexicanIcon },
    { name: "More", icon: moreIcon },
  ];

  // filter logic for all sections
  const filteredFoods =
    activeCategory === "All"
      ? foods
      : foods.filter(
          (f) =>
            f.category &&
            f.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const sections = {
    "Nearby Restaurants": filteredFoods.filter((f) => f.distanceNum < 3.5),
    "Hot Picks": filteredFoods.filter((f) => Number(f.rating) >= 4.5),
    "Verified Stores": filteredFoods.filter((f) => f.verified),
    "Special Offers": filteredFoods.filter((f) => f.offer),
    "Nearby Delivery": filteredFoods.filter((f) => f.distanceNum <= 2.0),
    "All Food": filteredFoods.slice(0, 60),
  };

  const SmallCard = ({ item }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="min-w-[220px] bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/food/${item.id}`)}
    >
      <div className="relative h-40">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.offer && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Offer
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" /> {item.rating}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {item.category} • {item.address.split(",")[1]}
        </p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-500" />
            {item.distance}
          </span>
          <span className="font-semibold text-blue-700">
            ₹{(item.id % 100) * 2 + 99}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const Section = ({ title, data }) => {
    const refKey = title.replace(/\s+/g, "_");
    return (
      <section className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-blue-700">{title}</h2>
        </div>
        <div className="relative">
          <button
            onClick={() => smoothScroll(carousels.current[refKey], "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
          >
            <ChevronLeft className="text-blue-600" />
          </button>

          <div
            ref={(el) => (carousels.current[refKey] = el)}
            className="flex gap-4 overflow-x-auto no-scrollbar px-8"
          >
            {data.slice(0, 15).map((f) => (
              <SmallCard key={f.id} item={f} />
            ))}
          </div>

          <button
            onClick={() => smoothScroll(carousels.current[refKey], "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
          >
            <ChevronRight className="text-blue-600" />
          </button>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[2.2cm]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* top video */}
      <div className="w-full overflow-hidden mb-6">
        <video
          src="/intory.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full object-cover"
          style={{ height: "14vw", minHeight: "70px" }}
        />
      </div>

      {/* categories */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 mb-10"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-5 text-center">
          Explore Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {categories.map((cat) => {
            const isActive = cat.name === activeCategory;
            return (
              <motion.div
                key={cat.name}
                whileHover={{ scale: 1.1 }}
                animate={{
                  scale: isActive ? 1.25 : 1,
                  boxShadow: isActive
                    ? "0px 0px 25px rgba(37,99,235,0.4)"
                    : "0px 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`cursor-pointer w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl relative`}
              >
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xs py-1 font-medium">
                  {cat.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {Object.entries(sections).map(([title, data]) =>
          data.length > 0 ? <Section key={title} title={title} data={data} /> : null
        )}
      </main>
    </div>
  );
};

export default Food;
