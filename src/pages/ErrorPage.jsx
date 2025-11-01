import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 text-center px-6">
      {/* ❌ Error Icon Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white shadow-xl rounded-full p-6 mb-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[6rem] font-extrabold text-blue-600"
        >
          404
        </motion.h1>
      </motion.div>

      {/* 🧭 Message */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-semibold text-gray-800"
      >
        Oops! Page Not Found
      </motion.h2>

      <p className="mt-3 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or might have been moved.
      </p>

      {/* 🏠 Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => navigate("/")}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </motion.button>
    </div>
  );
};

export default ErrorPage;
