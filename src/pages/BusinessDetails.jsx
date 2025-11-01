import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  ArrowLeft,
  MessageCircle,
  CreditCard,
  Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import data from "../data/businesses.json";

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const found = data.find((item) => item.id === Number(id));
    setBusiness(found);
  }, [id]);

  if (!business)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-[#f9fbff] pt-16 pb-24 overflow-hidden">
      {/* 🔙 Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        className="absolute left-5 top-6 z-30 bg-white p-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all"
      >
        <ArrowLeft className="text-blue-700 w-5 h-5" />
      </motion.button>

      {/* 🖼 Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-[45vh] sm:h-[50vh] overflow-hidden"
      >
        <img
          src={
            business.image ||
            "https://via.placeholder.com/600x400?text=Business+Image"
          }
          alt={business.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* 🏪 Name + Category */}
        <div className="absolute bottom-6 left-6 text-white">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold drop-shadow-md"
          >
            {business.name}
          </motion.h1>
          <p className="text-gray-200 text-sm mt-1">{business.category}</p>
        </div>
      </motion.div>

      {/* 🧾 Business Info Section */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative bg-white rounded-t-3xl shadow-lg -mt-10 p-6 sm:p-8"
      >
        {/* 🌟 Rating + Distance */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="h-5 w-5" />
            <span className="font-semibold text-gray-700">
              {business.rating} / 5.0
            </span>
          </div>
          <div className="text-gray-500 text-sm">{business.distance} away</div>
        </div>

        {/* 📍 Address */}
        <div className="mt-5 flex items-center gap-3 text-gray-700">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span className="font-medium">{business.address}</span>
        </div>

        {/* ⏰ Status */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              business.status === "Open Now"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {business.status}
          </span>
        </div>

        {/* 💳 Payment Methods (Static Example for Now) */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" /> Payment Methods
          </h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {["Cash", "UPI", "Credit Card"].map((method) => (
              <span
                key={method}
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* 🧺 Services (Static Example for Now) */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
            <Gift className="w-4 h-4 text-blue-600" /> Services Offered
          </h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              "Home Delivery",
              "Monthly Subscription",
              "Dairy Products",
              "Packaged Foods",
            ].map((srv) => (
              <span
                key={srv}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium"
              >
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* 🎁 Offer Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-4"
        >
          <h3 className="text-orange-600 font-semibold flex items-center gap-2 mb-1">
            <Gift className="h-4 w-4" /> Special Offer
          </h3>
          <p className="text-orange-800 font-medium text-sm">
            Get 15% OFF on orders above ₹1000
          </p>
          <p className="text-xs text-gray-500">
            Valid until September 30, 2025
          </p>
        </motion.div>
      </motion.div>

      {/* 📞 Floating Call Button */}
      <motion.button
        onClick={() => (window.location.href = `tel:${business.phone}`)}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 15px rgba(37,99,235,0.6)",
        }}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <Phone className="h-5 w-5" />
      </motion.button>

      {/* Background Soft Glow */}
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40" />
    </div>
  );
};

export default BusinessDetails;
