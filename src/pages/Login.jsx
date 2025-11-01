import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/market");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex justify-center items-center px-6">

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.9 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-1 tracking-wide">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to continue exploring nearby stores
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3 text-blue-600" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-blue-600" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-blue-600 rounded-xl text-white font-semibold shadow-md"
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
