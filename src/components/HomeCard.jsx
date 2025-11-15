import { motion } from "framer-motion";

export default function HomeCard({ title, image, icon, buttonText, onClick, variants }) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.03 }}
      className="relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
      onClick={onClick}
    >
      {/* BG Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-start justify-end p-6 h-full">

        {/* Title */}
        <h2 className="text-white text-3xl font-bold flex items-center gap-2 drop-shadow-lg">
          {icon} {title}
        </h2>

        {/* Button */}
        <button
          className="mt-3 px-5 py-2 bg-white/20 backdrop-blur-md text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
        >
          {buttonText} →
        </button>

        {/* Description (visible only on hover) */}
        <p className="text-white/80 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 max-w-xs">
          {/* description added from parent */}
        </p>

      </div>
    </motion.div>
  );
}
