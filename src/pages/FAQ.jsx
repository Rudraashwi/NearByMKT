import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the NearBy Directory?",
    answer:
      "NearBy Directory helps you find trusted shops, restaurants, and services around your area — all verified and easy to explore.",
  },
  {
    question: "How do I add my business?",
    answer:
      "You can list your business by visiting the 'Contact' page and filling out the form with your shop details.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! Searching and browsing businesses is completely free for users.",
  },
  {
    question: "Can I leave reviews?",
    answer:
      "User reviews and ratings are coming soon! Stay tuned for the next update.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Absolutely — the website is fully responsive and works on phones, tablets, and desktops.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-[2.5cm] pb-10">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about the NearBy Directory platform.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold text-blue-700 focus:outline-none"
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-4 text-gray-700"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
