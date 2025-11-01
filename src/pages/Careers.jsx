import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Star, Users, Coffee } from "lucide-react";

const Careers = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen text-gray-800">
      {/* 🌟 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 sm:px-12 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-extrabold text-blue-700 mb-4"
        >
          Join Our Team at <span className="text-blue-500">Near By MKT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl text-gray-600 text-lg sm:text-xl mb-8"
        >
          We’re building the next generation of local commerce.  
          Grow your career, make an impact, and innovate with us.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold 
                     shadow-lg hover:bg-blue-700 hover:shadow-blue-300/50 transition-all"
        >
          View Open Roles
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center blur-2xl -z-10"
        ></motion.div>
      </section>

      {/* 💼 Open Positions */}
      <section className="max-w-6xl mx-auto py-16 px-6 sm:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-blue-700 mb-12"
        >
          Open Positions
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Frontend Developer",
              desc: "Create stunning interfaces and optimize user experience.",
            },
            {
              title: "Backend Engineer",
              desc: "Design and build scalable APIs for millions of users.",
            },
            {
              title: "UI/UX Designer",
              desc: "Craft intuitive, delightful experiences for every device.",
            },
            {
              title: "Marketing Manager",
              desc: "Develop strategies that amplify our brand reach.",
            },
            {
              title: "Business Analyst",
              desc: "Bridge product insights with impactful business outcomes.",
            },
            {
              title: "Customer Success Lead",
              desc: "Engage with users and make every interaction valuable.",
            },
          ].map((job, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center border border-blue-100"
            >
              <Briefcase className="w-10 h-10 mx-auto text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.desc}</p>
              <button className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌈 Why Join Us */}
      <section className="bg-blue-100 py-20 px-6 sm:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-blue-800 mb-12"
        >
          Why Join Near By MKT?
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Users className="w-10 h-10 text-blue-700 mx-auto" />,
              title: "Collaborative Culture",
              desc: "Work with a passionate and creative team that values innovation.",
            },
            {
              icon: <Star className="w-10 h-10 text-blue-700 mx-auto" />,
              title: "Growth Opportunities",
              desc: "Upskill and grow in a fast-paced, empowering environment.",
            },
            {
              icon: <Briefcase className="w-10 h-10 text-blue-700 mx-auto" />,
              title: "Meaningful Impact",
              desc: "Shape the future of local markets across India.",
            },
            {
              icon: <Coffee className="w-10 h-10 text-blue-700 mx-auto" />,
              title: "Fun Workspace",
              desc: "Work hard, chill harder — we believe in work-life balance.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center border border-blue-100"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-blue-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✨ Footer CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to Build the Future with Us?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition-all"
        >
          Explore Careers
        </motion.button>
      </section>
    </div>
  );
};

export default Careers;
