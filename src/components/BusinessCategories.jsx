import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 20+ Business category JSON data
export const businessCategories = [
  { id: 1, name: "Groceries", icon: "🛒", color: "#d1fae5" },
  { id: 2, name: "Electronic", icon: "💻", color: "#dbeafe" },
  { id: 3, name: "Fashion", icon: "👜", color: "#f3e8ff" },
  { id: 4, name: "Beauty", icon: "👩", color: "#ffe4e6" },
  { id: 5, name: "Home", icon: "🏠", color: "#ffedd5" },
  { id: 6, name: "Bakery", icon: "🍞", color: "#fef3c7" },
  { id: 7, name: "Gifts", icon: "🎁", color: "#fce7f3" },
  { id: 8, name: "Flowers", icon: "🌸", color: "#f1f5f9" },
  { id: 9, name: "Pet Care", icon: "🐾", color: "#e0f2fe" },
  { id: 10, name: "Stationery", icon: "📚", color: "#fef9c3" },
  { id: 11, name: "More", icon: "➕", color: "#e5e7eb", isMore: true }
];

export default function BusinessCategories() {
  const navigate = useNavigate();

  const goToCategory = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/business-category/${slug}`);
  };

  return (
    <div className="w-full px-5 py-4">
      <h2 className="text-xl font-bold mb-3">Business Categories</h2>

      <div className="flex gap-6 overflow-x-auto hide-scrollbar py-2">
        {businessCategories.map((cat) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={cat.id}
            onClick={() => !cat.isMore && goToCategory(cat.name)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow"
              style={{ backgroundColor: cat.color }}
            >
              <span className="text-4xl">{cat.icon}</span>
            </div>

            <p className="mt-2 text-sm font-semibold">{cat.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
