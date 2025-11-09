// src/pages/Market.jsx
import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, Tag, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import businessesRaw from "../data/businesses.json";
import { useNavigate } from "react-router-dom";
import MarketSection from "../pages/MarketSection";
import MarketCategories from "../components/MarketCategories";

/**
 * Market.jsx
 * - video file: public/market.mp4
 * - json: src/data/businesses.json
 *
 * Notes:
 * - This component will enrich data with `verified` and `offer` booleans if missing.
 * - It computes numeric distance from "X.Y km" strings for filtering.
 */

/* small helper: parse "1.9 km" -> 1.9 */
const parseDistanceKm = (d) => {
  if (!d) return Infinity;
  const m = String(d).match(/([\d.]+)/);
  return m ? Number(m[1]) : Infinity;
};

/* small utility: scroll a container */
const smoothScroll = (el, dir, px = 380) => {
  if (!el) return;
  el.scrollBy({ left: dir === "left" ? -px : px, behavior: "smooth" });
};

const Market = () => {
  const navigate = useNavigate();
  const carousels = useRef({});
  // Enrich data (memoized)
  const businesses = useMemo(() => {
    return businessesRaw.map((b) => {
      // keep original fields, add defaults if not present
      const verified = typeof b.verified === "boolean" ? b.verified : Math.random() < 0.28; // ~28% verified
      const offer = typeof b.offer === "boolean" ? b.offer : Math.random() < 0.22; // ~22% offers
      const distanceNum = parseDistanceKm(b.distance);
      return { ...b, verified, offer, distanceNum };
    });
  }, []);

  // Section filters (realistic picks)
  const nearbyStores = useMemo(
    () => businesses.filter((s) => s.distanceNum <= 3.5).slice(0, 8),
    [businesses]
  );
  const popularBrands = useMemo(
    () => businesses.filter((s) => Number(s.rating) >= 4.5).slice(0, 8),
    [businesses]
  );
  const verifiedStores = useMemo(
    () => businesses.filter((s) => s.verified).slice(0, 8),
    [businesses]
  );
  const specialOffers = useMemo(
    () => businesses.filter((s) => s.offer).slice(0, 8),
    [businesses]
  );
  const nearbyDelivery = useMemo(
    () => businesses.filter((s) => s.distanceNum <= 2).slice(0, 8),
    [businesses]
  );
  const allProducts = businesses.slice(0, 40); // show first 40 as "All products"

  // small card for horizontal lists
  const SmallCard = ({ biz }) => (
    
    <div>
      
     
      
      
      <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      className="min-w-[220px] max-w-[220px] bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/business/${biz.id}`)}
    >
      
      <div className="relative h-36 overflow-hidden">
        <img
          src={biz.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={biz.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* rating badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-xl text-xs flex items-center gap-1">
          <Star className="w-3 h-3" /> {String(biz.rating || "4.0")}
        </div>
        {/* offer badge */}
        {biz.offer && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-xl text-xs">
            OFFER
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{biz.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{biz.category} • {biz.address.split(",")[1] || biz.address}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="w-3 h-3 text-blue-600" /> <span>{biz.distance}</span>
          </div>
          <div className="text-sm font-semibold text-blue-700">₹{Math.floor((biz.id % 100) * 3 + 49)}</div>
        </div>
      </div>
    </motion.div></div>
  );

  // Large product card for "All Products"
  const ProductCard = ({ biz }) => (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/business/${biz.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={biz.image || "https://via.placeholder.com/800x600?text=No+Image"}
          alt={biz.name}
          className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{biz.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{biz.category} • {biz.address.split(",")[1]}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-500 justify-end">
              <Star className="w-4 h-4" /> <span className="font-medium">{biz.rating}</span>
            </div>
            <div className="text-sm text-gray-500 mt-2">{biz.distance}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${biz.phone}`; }}
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
          >
            Call
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); /* placeholder for direction */ }}
            className="py-2 px-3 rounded-lg border border-gray-200 text-sm"
          >
            Directions
          </button>
        </div>
      </div>
    </motion.div>
  );

  const Section = ({ title, viewAllHref, items, horizontal = true, tag }) => {
    const refKey = title.replace(/\s+/g, "_");
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
          <h3 className="text-xl font-bold text-blue-700 flex items-center gap-3">
            {tag || null}
            {title}
          </h3>
          {viewAllHref && (
            <a href={viewAllHref} className="text-sm text-blue-600 font-medium">View All</a>
          )}
        </div>

        {horizontal ? (
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-sm"
              onClick={() => smoothScroll(carousels.current[refKey], "left", 300)}
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>

            <div
              ref={(el) => (carousels.current[refKey] = el)}
              className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {items.map((biz) => (
                <SmallCard key={biz.id} biz={biz} />
              ))}
            </div>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-sm"
              onClick={() => smoothScroll(carousels.current[refKey], "right", 300)}
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((biz) => (
              <ProductCard key={biz.id} biz={biz} />
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] pt-[2.1cm]">
      
      {/* inline small CSS for hiding scrollbars and utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* slim video banner: height = width/10 -> use vw to keep proportional */}
      <div className="w-full max-w-full mx-auto px-2 sm:px-6">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <video
            src="/intory.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full"
            style={{ height: "14vw", minHeight: "48px", objectFit: "cover" }} // width/10 and min height for mobiles
          />
        </div>
      </div>
       <div>
        <MarketSection />
      </div>
      <div className="justify-items-start">
        <MarketCategories />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Nearby Stores */}
        <Section title="Nearby Stores" viewAllHref="#nearby" items={nearbyStores} horizontal tag={<Tag className="w-5 h-5 text-blue-600" />} />

        {/* Popular Brands */}
        <Section title="Popular Brands" viewAllHref="#popular" items={popularBrands} horizontal tag={<span className="text-xl">🔥</span>} />

        {/* Verified Stores */}
        <Section title="Verified Stores" viewAllHref="#verified" items={verifiedStores} horizontal tag={<CheckCircle className="w-5 h-5 text-green-600" />} />

        {/* Special Offers */}
        <Section title="Special Offers" viewAllHref="#offers" items={specialOffers} horizontal tag={<Tag className="w-5 h-5 text-orange-500" />} />

        {/* Nearby Delivery */}
        <Section title="Nearby Delivery" viewAllHref="#delivery" items={nearbyDelivery} horizontal tag={<span className="text-lg">📦</span>} />

        {/* All Products (grid) */}
        <Section title="All Products" viewAllHref="#all" items={allProducts} horizontal={false} />
      </main>
    </div>
  );
};

export default Market;
