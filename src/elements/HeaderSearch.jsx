import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import useDebounce from "@/hooks/useDebounce";
import { TRENDING } from "@/search/trending"; // create file exporting TRENDING array
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"; // optional

export default function HeaderSearch() {
  const { search, recent, addRecent } = useSearch();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(q, 200);
  const [suggestions, setSuggestions] = useState([]);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debounced) { setSuggestions([]); return; }
    setSuggestions(search(debounced).slice(0, 8));
  }, [debounced, search]);

  useEffect(() => {
    const handler = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const submit = (term) => {
    const query = (term ?? q).trim();
    if (!query) return;
    addRecent(query);
    setOpen(false);
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="relative flex-grow mx-4 sm:mx-6 mt-3 sm:mt-0 max-w-md w-full"
    >
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          type="text"
          placeholder="Search for shops, markets, or deals..."
          className="w-full pl-11 pr-4 py-2 sm:py-2.5 rounded-full text-gray-800 
                     bg-white/95 shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                     focus:outline-none focus:ring-2 focus:ring-blue-300 
                     placeholder-gray-500 text-sm sm:text-base"
        />
        <button
          onClick={() => submit()}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
          aria-label="search"
        >
          <MagnifyingGlassIcon />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="absolute mt-2 w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden z-50"
        >
          {/* If typing -> show live suggestions */}
          {q.trim() ? (
            <div className="max-h-72 overflow-auto">
              {suggestions.length ? suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => submit(s.name)}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span className="text-gray-800 font-medium">{s.name}</span>
                  <span className="text-xs text-gray-500">• {s.category}</span>
                </button>
              )) : (
                <div className="px-4 py-3 text-sm text-gray-500">No results. Press Enter to search all.</div>
              )}
            </div>
          ) : (
            // Otherwise show Trending + Recent
            <div className="grid grid-cols-2 gap-3 p-3">
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500">Trending</div>
                <div className="flex flex-wrap gap-2 px-3 pb-3">
                  {TRENDING.slice(0,10).map((t) => (
                    <button
                      key={t}
                      onClick={() => submit(t)}
                      className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500">Recent</div>
                <div className="flex flex-wrap gap-2 px-3 pb-3">
                  {recent.length ? recent.map((r) => (
                    <button
                      key={r}
                      onClick={() => submit(r)}
                      className="px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-sm text-blue-700"
                    >
                      {r}
                    </button>
                  )) : <div className="px-3 py-1.5 text-sm text-gray-400">No recent searches</div>}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
