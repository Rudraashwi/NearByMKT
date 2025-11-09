import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CUISINES = [
  "Afghani", "American", "Andhra", "Arabian", "Asian", "Assamese", "Awadhi", "Bakery", "Barbecue", "Bengali",
  "Beverages", "Bihari", "Biryani", "Brownies", "Burger", "Cafe", "Cakes", "Chinese", "Continental", "Desserts",
  "Fast Food", "French", "Grill", "Healthy Food", "Hyderabadi", "Ice Cream", "Indian", "Italian", "Jain",
  "Juices", "Kebabs", "Korean", "Lebanese", "Lunch", "Maharashtrian", "Mexican", "Mughlai", "North Indian",
  "Oriental", "Pasta", "Pizza", "Punjabi", "Rajasthani", "Rolls", "Salad", "Seafood", "Shakes", "Snacks",
  "South Indian", "Street Food", "Sushi", "Sweets", "Tandoor", "Thai", "Thali", "Tibetan", "Waffle"
];

const SORT_OPTIONS = [
  { key: "relevance", label: "Relevance (Default)" },
  { key: "delivery_time", label: "Delivery Time" },
  { key: "rating", label: "Rating" },
  { key: "cost_low_high", label: "Cost: Low to High" },
  { key: "cost_high_low", label: "Cost: High to Low" },
];

const DELIVERY_TIME = ["15 min", "30 min", "45+ min"];
const PRICE_CHIPS = ["₹300–₹600", "Less than ₹300"];

export default function FilterBar({ onApply }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [delivery, setDelivery] = useState("");
  const [vegType, setVegType] = useState("");
  const [cuisines, setCuisines] = useState(() => new Set());
  const [activeAccordion, setActiveAccordion] = useState("sort");

  const toggleCuisine = (name) => {
    setCuisines((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const clearAll = () => {
    setSort("relevance");
    setDelivery("");
    setVegType("");
    setCuisines(new Set());
  };

  const applyNow = () => {
    const payload = {
      sort,
      delivery,
      vegType,
      cuisines: Array.from(cuisines),
    };
    onApply?.(payload);
    setOpen(false);
  };

  return (
    <div className="w-full border-b bg-linear-to-b from-gray-500 to-blue-100 sticky top-[2.5cm] z-40">
      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-8 pt-4">
          <button className="relative pb-3 text-lg font-semibold text-black">
            Order Online
            <span className="absolute -bottom-[1px] left-0 h-[3px] w-24 bg-gray-500 rounded-full" />
          </button>

          <button
            onClick={() => navigate("/tabletap")}
            className="pb-3 text-lg text-gray-100 hover:text-gray-800 transition"
          >
            TableTap
          </button>
        </div>

        {/* Chips Row */}
        <div className="flex items-center gap-3 py-3 overflow-x-auto no-scrollbar mt-8 ">
          <Chip label="Filter" onClick={() => setOpen(true)} />
          <Chip label="Sort By" onClick={() => setOpen(true)} rightIcon="▼" />
          <Chip label="Ratings 4.0+" />
          <Chip label="Pure Veg" />
          <Chip label="Offers" />
          {PRICE_CHIPS.map((p) => (
            <Chip key={p} label={p} />
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-linear-to-b from-gray-500 to-blue-100 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b mt-1">
                  <h3 className="text-2xl text-gray-50 font-semibold">Filters</h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-2xl text-amber-50 leading-none hover:bg-gray-100 rounded-2xl px-3 hover:text-gray-950"
                  >
                    ×
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                  {/* Accordion Sections */}
                  <Accordion
                    title="Sort"
                    active={activeAccordion === "sort"}
                    onToggle={() =>
                      setActiveAccordion((p) => (p === "sort" ? "" : "sort"))
                    }
                  >
                    <div className="space-y-3">
                      {SORT_OPTIONS.map((opt) => (
                        <label
                          key={opt.key}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="sort"
                            checked={sort === opt.key}
                            onChange={() => setSort(opt.key)}
                            className="accent-gray-600"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </Accordion>

                  <Accordion
                    title="Delivery Time"
                    active={activeAccordion === "delivery"}
                    onToggle={() =>
                      setActiveAccordion((p) =>
                        p === "delivery" ? "" : "delivery"
                      )
                    }
                  >
                    <div className="flex flex-wrap gap-2">
                      {DELIVERY_TIME.map((d) => (
                        <button
                          key={d}
                          onClick={() =>
                            setDelivery((prev) => (prev === d ? "" : d))
                          }
                          className={`px-3 py-1.5 rounded-full border text-sm ${
                            delivery === d
                              ? "bg-gray-50 border-gray-500 text-gray-600"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </Accordion>

                  <Accordion
                    title="Cuisines"
                    active={activeAccordion === "cuisine"}
                    onToggle={() =>
                      setActiveAccordion((p) =>
                        p === "cuisine" ? "" : "cuisine"
                      )
                    }
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                      {CUISINES.map((c) => {
                        const active = cuisines.has(c);
                        return (
                          <button
                            key={c}
                            onClick={() => toggleCuisine(c)}
                            className={`px-3 py-2 text-sm border rounded-lg truncate ${
                              active
                                ? "bg-gray-50 border-gray-500 text-gray-700"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </Accordion>

                  <Accordion
                    title="Veg / Non-Veg"
                    active={activeAccordion === "veg"}
                    onToggle={() =>
                      setActiveAccordion((p) => (p === "veg" ? "" : "veg"))
                    }
                  >
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="vegType"
                          value="veg"
                          checked={vegType === "veg"}
                          onChange={() => setVegType("veg")}
                          className="accent-gray-600"
                        />
                        <span>Veg</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="vegType"
                          value="nonveg"
                          checked={vegType === "nonveg"}
                          onChange={() => setVegType("nonveg")}
                          className="accent-gray-600"
                        />
                        <span>Non-Veg</span>
                      </label>
                    </div>
                  </Accordion>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center border-t px-6 py-4">
                  <button onClick={clearAll} className="text-gray-700">
                    Clear All
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      className="border rounded-lg px-4 py-2 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyNow}
                      className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- Chip Component --- */
function Chip({ label, onClick, rightIcon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 border rounded-full px-4 py-2 bg-white text-sm shadow-sm hover:bg-gray-50 transition-all"
    >
      {label} {rightIcon && <span className="text-xs">{rightIcon}</span>}
    </button>
  );
}

/* --- Accordion Component --- */
function Accordion({ title, children, active, onToggle }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-800"
      >
        {title}
        <span>{active ? "–" : "+"}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden px-4 py-3"
      >
        {active && children}
      </motion.div>
    </div>
  );
}
