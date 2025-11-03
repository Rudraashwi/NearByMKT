import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Globe, Megaphone, ShoppingBag } from "lucide-react";

const services = [
  {
    title: "Business Listing",
    description:
      "Get your local business listed in our directory and reach thousands of nearby customers.",
    icon: <Briefcase className="h-10 w-10 text-blue-600" />,
  },
  {
    title: "Website Development",
    description:
      "Launch a professional business website designed to attract customers and build trust.",
    icon: <Globe className="h-10 w-10 text-blue-600" />,
  },
  {
    title: "Digital Marketing",
    description:
      "Boost your business visibility through targeted digital marketing campaigns and social media promotion.",
    icon: <Megaphone className="h-10 w-10 text-blue-600" />,
  },
  {
    title: "E-Commerce Setup",
    description:
      "Start selling products online with your own secure and easy-to-use online store.",
    icon: <ShoppingBag className="h-10 w-10 text-blue-600" />,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-500 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-10 shadow-md text-center">
        <h1 className="text-3xl font-bold tracking-wide">Our Services</h1>
        <p className="text-blue-100 mt-2 text-sm md:text-base">
          Everything you need to grow and manage your business digitally
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {service.title}
            </h2>
            <p className="text-sm text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
