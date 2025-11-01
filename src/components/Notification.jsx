import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const notifications = [
  { id: 1, title: "Order #1234 Dispatched", message: "Your order has been shipped and is on its way.", time: "10 mins ago", read: false },
  { id: 2, title: "New Discount Available", message: "Get 20% off on all groceries today only!", time: "1 hour ago", read: false },
  { id: 3, title: "Payment Received", message: "We have received your payment for order #1220. Thank you!", time: "4 hours ago", read: true },
];

const Notification = () => {
  return (
    <section className="pt-24 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-sky-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 120, delay: notif.id * 0.1 }}
              className={`p-4 bg-white rounded-xl shadow-md flex justify-between items-start 
                            border ${notif.read ? "border-gray-200" : "border-blue-300"}`}
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{notif.title}</h3>
                <p className="text-gray-600 mt-1">{notif.message}</p>
                <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </div>
        {notifications.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-gray-500 mt-10"
          >
            No new notifications
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Notification;
