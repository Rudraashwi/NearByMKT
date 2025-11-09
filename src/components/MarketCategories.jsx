import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { marketCategories } from "../assets/marketCategories";

const MarketCategories = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    const slug = name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
    navigate(`/market/${slug}`);
    setOpen(false);
  };

  return (
    <div className="relative w-full text-center my-6">
      {/* Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className=" justify-items-start items-start text-lg font-semibold bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
        whileTap={{ scale: 0.95 }}
      >
        All ▽
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white w-11/12 max-w-6xl rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-700">
                    All Categories
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-600 hover:text-black text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {marketCategories.map((cat) => (
                    <motion.div
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <img
                        src={`/assets/${cat.img}`}
                        alt={cat.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {cat.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketCategories;
