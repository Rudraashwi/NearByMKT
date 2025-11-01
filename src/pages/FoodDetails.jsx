// src/pages/FoodDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  ArrowLeft,
  Gift,
  CheckCircle,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import data from "../data/food.json";

const FoodDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const found = data.find((x) => x.id === Number(id));
    setItem(found);
  }, [id]);

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#f8fbff] pt-[2.5cm] pb-28">
      {/* back btn */}
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        className="absolute left-5 top-8 z-30 bg-white p-3 rounded-full shadow-md hover:bg-blue-50"
      >
        <ArrowLeft className="text-blue-700 w-5 h-5" />
      </motion.button>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-[45vh] sm:h-[50vh] overflow-hidden rounded-b-3xl shadow-lg"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-6 text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold"
          >
            {item.name}
          </motion.h1>
          <p className="text-gray-200 text-sm mt-1">{item.category}</p>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="-mt-10 relative bg-white rounded-t-3xl shadow-lg p-6 sm:p-8"
      >
        {/* rating + distance */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="w-5 h-5" />
            <span className="font-semibold text-gray-700">{item.rating}</span>
          </div>
          <div className="text-sm text-gray-500">{item.distance}</div>
        </div>

        {item.verified && (
          <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Verified Restaurant
          </div>
        )}

        {/* address */}
        <div className="mt-5 flex items-center gap-3 text-gray-700">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span className="font-medium">{item.address}</span>
        </div>

        {/* status */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              item.status === "Open Now"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* offers */}
        {item.offer && (
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-4"
          >
            <h3 className="text-orange-600 font-semibold flex items-center gap-2 mb-1">
              <Tag className="h-4 w-4" /> Special Offer
            </h3>
            <p className="text-orange-700 font-medium text-sm">
              Get 20% OFF today on this outlet
            </p>
            <p className="text-xs text-gray-500">
              Limited time deal • only today
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Call Button */}
      <motion.button
        onClick={() => (window.location.href = `tel:${item.phone}`)}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px rgba(37,99,235,0.7)",
        }}
        className="fixed bottom-7 right-7 bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 transition-all"
      >
        <Phone className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FoodDetails;
