import React, { useEffect } from "react";
import { motion } from "framer-motion";

const HeroVideo = () => {
  // ✅ Scroll to next section
  const scrollToNext = () => {
    const nextSection = document.querySelector("#after-hero");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn("⚠️ Section with id='after-hero' not found!");
    }
  };

  // ✅ Always start from top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="relative w-full h-[calc(100vh-2.4cm)] mt-[-0.41cm] overflow-hidden flex items-center justify-center"
    >
      {/* 🎥 Background Video */}
      <video
        src="/mkt.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        style={{
          objectPosition: "center top",
  
        }}
      />

      {/* 🎨 Overlay for cinematic tone */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-0"></div>

      {/* 🧠 Text + Buttons */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight"
        >
          NearBy<span className="text-blue-400">MKT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl max-w-xl mb-8 text-gray-100"
        >
          Manage your food, groceries, hotels & markets — all in one smart
          platform.
        </motion.p>

        {/* 🛍️ Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {/* Google Play */}
          <a
            href="#"
            className="bg-black flex items-center gap-2 px-5 py-3 rounded-xl shadow-md hover:bg-gray-900 transition-all border border-gray-700"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>

          {/* App Store */}
          <a
            href="#"
            className="bg-black flex items-center gap-2 px-5 py-3 rounded-xl shadow-md hover:bg-gray-900 transition-all border border-gray-700"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
        </motion.div>
      </div>

      {/* ⬇️ Scroll Down Button */}
      <motion.div
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white cursor-pointer flex flex-col items-center select-none z-20"
      >
        <span className="text-sm tracking-wide uppercase opacity-80 mb-1">
          Scroll Down
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVideo;
