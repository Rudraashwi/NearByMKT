import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import loginImg from "../assets/7.png";

const Login = () => {
  return (
    <div className="flex items-center justify-center bg-linear-to-b from-gray-500 to-blue-100 py-24 px-6">
      <div className="flex w-full max-w-4xl bg-linear-to-b from-gray-550 to-blue-100 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Left Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-blue-950 text-5xl font-semibold mb-2">Near By MKT</h1>
          <p className="text-2xl text-blue-800 mb-6">Welcome back !!!</p>
          <h2 className="text-3xl text-blue-900 font-bold mb-6">Log In</h2>

          {/* Email/Phone Input */}
          <label className="text-gray-700 text-sm font-medium">Email / Phone</label>
          <input
            type="text"
            placeholder="login@gmail.com or 9876543210"
            className="w-full mt-1 mb-4 p-3 rounded-md bg-blue-100 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Password Input */}
          <label className="text-gray-700 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 p-3 rounded-md bg-blue-100 outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <div className="text-right text-sm text-gray-500 mt-1 mb-4 cursor-pointer hover:text-blue-600">
            Forgot Password?
          </div>

          {/* Animated Blue Login Button */}
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 20px rgba(59,130,246,0.6)",
              backgroundColor: "#1e40af",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="bg-blue-500 text-white py-3 rounded-full font-semibold shadow-md border border-blue-200 transition-all duration-300"
          >
            LOGIN →
          </motion.button>

          {/* Divider */}
          <p className="text-center text-gray-500 text-sm mt-6 mb-3">or continue with</p>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button className="border rounded-full p-3 hover:bg-gray-100 transition">
              <FcGoogle size={22} />
            </button>
            <button className="border rounded-full p-3 hover:bg-gray-100 transition">
              <FaFacebookF size={22} className="text-blue-600" />
            </button>
            <button className="border rounded-full p-3 hover:bg-gray-100 transition">
              <FaGithub size={22} />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account yet?{" "}
            <span className="text-blue-500 cursor-pointer font-medium hover:underline">
              Sign up for free
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-linear-to-b from-gray-600 to-blue-100 flex flex-col items-center justify-center p-8 relative">
          {/* Logos inside the box */}
        
          <img
            src={loginImg}
            alt="Login"
            className="w-72 h-auto object-contain translate-x-[-20px] drop-shadow-xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
