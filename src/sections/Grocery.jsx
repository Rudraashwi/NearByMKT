// src/pages/Grocery.jsx
import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import businesses from "../data/businesses.json";

// ✅ Import category icons
import allIcon from "../assets/alll.png";
import veggiesIcon from "../assets/veggies.png";
import fruitsIcon from "../assets/fruits.png";
import dairyIcon from "../assets/dairy.png";
import dealsIcon from "../assets/deals.png";
import snacksIcon from "../assets/snacks.png";
import bakeryIcon from "../assets/bakery.png";
import drinksIcon from "../assets/drinks.png";
import meatIcon from "../assets/meat.png";
import homecareIcon from "../assets/home_care.png";
import beautyIcon from "../assets/beauty.png";
import babyIcon from "../assets/baby.png";
import petIcon from "../assets/pet.png";
import organicIcon from "../assets/organic.png";
import sweetsIcon from "../assets/sweets.png";


// ✅ Helper Functions
const parseDistanceKm = (d) => {
  if (!d) return 99;
  const m = String(d).match(/([\d.]+)/);
  return m ? Number(m[1]) : 99;
};

const smoothScroll = (el, dir, px = 320) => {
  if (!el) return;
  el.scrollBy({ left: dir === "left" ? -px : px, behavior: "smooth" });
};

const Grocery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const carousels = useRef({});

  // ✅ Enrich Data
  const enriched = useMemo(
    () =>
      businesses.map((b) => ({
        ...b,
        distanceNum: parseDistanceKm(b.distance),
        verified:
          typeof b.verified === "boolean" ? b.verified : Math.random() < 0.25,
        offer: typeof b.offer === "boolean" ? b.offer : Math.random() < 0.2,
      })),
    []
  );

  // ✅ Categories
  const categories = [
    { name: "All", icon: allIcon },
    { name: "Veggies", icon: veggiesIcon },
    { name: "Fruits", icon: fruitsIcon },
    { name: "Dairy", icon: dairyIcon },
    { name: "Deals", icon: dealsIcon },
    { name: "Snacks", icon: snacksIcon },
    { name: "Bakery", icon: bakeryIcon },
    { name: "Drinks", icon: drinksIcon },
    { name: "Meat", icon: meatIcon },
    { name: "Home Care", icon: homecareIcon },
    { name: "Beauty", icon: beautyIcon },
    { name: "Baby", icon: babyIcon },
    { name: "Pet", icon: petIcon },
    { name: "Organic", icon: organicIcon },
    { name: "Sweets", icon: sweetsIcon },
  ];

  // ✅ Filter Logic
  const filtered =
    activeCategory === "All"
      ? enriched
      : enriched.filter((b) =>
          (b.category || "")
            .toLowerCase()
            .includes(activeCategory.toLowerCase())
        );

  // ✅ Sections
  const sections = {
    "Nearby Stores": filtered.filter((f) => f.distanceNum < 3.5),
    "Hot Picks": filtered.filter((f) => Number(f.rating) >= 4.5),
    "Verified Stores": filtered.filter((f) => f.verified),
    "Special Offers": filtered.filter((f) => f.offer),
    "Nearby Delivery": filtered.filter((f) => f.distanceNum <= 2.0),
    "All Products": filtered.slice(0, 60),
  };

  // ✅ SmallCard
  const SmallCard = ({ item }) => (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25 }}
      className="min-w-[220px] bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/business/${item.id}`)}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={
            item.image ||
            "https://via.placeholder.com/420x300?text=No+Image"
          }
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.offer && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
            OFFER
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Star className="w-3 h-3" /> {item.rating}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {item.category} • {item.address.split(",")[1] || item.address}
        </p>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-600" /> {item.distance}
          </span>
          <span className="font-semibold text-blue-700">
            ₹{Math.floor((item.id % 100) * 2 + 49)}
          </span>
        </div>
      </div>
    </motion.div>
  );

  // ✅ GridCard
  const GridCard = ({ item }) => (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.18 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/business/${item.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.verified && (
          <div className="absolute top-3 left-3 bg-white/90 rounded-full px-2 py-1 text-xs flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" /> Verified
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {item.category} • {item.address.split(",")[1]}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-500 justify-end">
              <Star className="w-4 h-4" />{" "}
              <span className="font-medium">{item.rating}</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">{item.distance}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `tel:${item.phone}`;
            }}
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
          >
            Call
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="py-2 px-3 rounded-lg border border-gray-200 text-sm"
          >
            Directions
          </button>
        </div>
      </div>
    </motion.div>
  );

  // ✅ Section Component
  const Section = ({ title, items }) => {
    const refKey = title.replace(/\s+/g, "_");
    return (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
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
            {items.slice(0, 15).map((it) => (
              <SmallCard key={it.id} item={it} />
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

  // ✅ Main JSX
  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[2.5cm]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-1, .line-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-1 { -webkit-line-clamp: 1; }
        .line-clamp-2 { -webkit-line-clamp: 2; }
      `}</style>

      {/* 🎥 Slim Video Banner */}
      <div className="w-full max-w-full mx-auto px-4 sm:px-6 mb-6">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <video
            src="/intory.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full"
            style={{
              height: "10vw",
              minHeight: "60px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* 🛒 Categories */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((c) => {
            const active = c.name === activeCategory;
            return (
              <motion.div
                key={c.name}
                whileHover={{ scale: 1.08 }}
                animate={{ scale: active ? 1.18 : 1 }}
                transition={{ type: "spring", stiffness: 220 }}
                onClick={() => setActiveCategory(c.name)}
                className="cursor-pointer w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md bg-white relative flex items-center justify-center"
                style={{
                  boxShadow: active
                    ? "0 10px 30px rgba(37,99,235,0.18)"
                    : undefined,
                }}
              >
                <img
                  src={c.icon}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/45 text-white text-xs text-center py-1 font-medium">
                  {c.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 🏪 Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {Object.entries(sections).map(([title, items]) =>
          items.length ? <Section key={title} title={title} items={items} /> : null
        )}

        {/* 🧺 All Products Grid */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sections["All Products"].map((p) => (
              <GridCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Grocery;
