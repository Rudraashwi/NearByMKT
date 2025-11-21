// src/pages/BusinessDetails.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  ArrowLeft,
  MessageCircle,
  CreditCard,
  Gift,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/product.json";
import MarketCategories from "../components/MarketCategories";

const LS_FAV_KEY = "nbm_favs_v1";

function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_FAV_KEY) || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(LS_FAV_KEY, JSON.stringify(favs));
  }, [favs]);
  const toggle = (id) =>
    setFavs((s) => (s.includes(id) ? s.filter((x) => x !== id) : [id, ...s]));
  const isFav = (id) => favs.includes(id);
  return { favs, toggle, isFav, setFavs };
}

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopId = Number(id) || 1;
  const shop = useMemo(() => data.find((d) => Number(d.id) === shopId) || data[0], [shopId]);

  const { isFav, toggle } = useFavorites();
  const [slideIndex, setSlideIndex] = useState(0);
  const slideTimer = useRef(null);

  // product slider refs
  const popularRef = useRef(null);

  // auto-slide for cover images (if multiple images present)
  const coverImgs = shop.coverImages ?? [shop.image];

  useEffect(() => {
    clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => {
      setSlideIndex((s) => (s + 1) % coverImgs.length);
    }, 4000);
    return () => clearInterval(slideTimer.current);
  }, [coverImgs.length]);

  // share handler
  const onShare = async () => {
    const shareData = {
      title: shop.name,
      text: `${shop.name} — ${shop.category}. Check it out!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      }
    } catch (e) {
      // ignore
    }
  };

  // horizontal slide helpers for popular products
  const scrollPopular = (dir = "next") => {
    const el = popularRef.current;
    if (!el) return;
    const cardW = el.querySelector("[data-pop-card]")?.getBoundingClientRect().width || 220;
    const amt = dir === "next" ? cardW + 12 : -(cardW + 12);
    el.scrollBy({ left: amt, behavior: "smooth" });
  };

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fbff]">
        <span className="text-gray-600">Shop not found</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-500 to-blue-100">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed left-4 top-4 z-40 bg-white rounded-full p-2 shadow-md hover:scale-105 transition"
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5 text-blue-600" />
      </button>

      {/* layout container */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: 1/3 fixed column */}
        <aside
          className="lg:col-span-1"
          aria-hidden={false}
        >
          <div className="sticky top-14">
            {/* cover slideshow */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={slideIndex}
                  src={coverImgs[slideIndex]}
                  alt={shop.name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-64 object-cover"
                />
              </AnimatePresence>

              {/* slideshow dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {coverImgs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`w-2 h-2 rounded-full ${i === slideIndex ? "bg-white" : "bg-white/40"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* fav + share top-right */}
              

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => toggle(shop.id)}
                  className={`p-2 rounded-full backdrop-blur-sm bg-white/30 hover:scale-105 transition shadow`}
                  title="Favorite"
                >
                  <Heart className={`w-5 h-5 ${isFav(shop.id) ? "text-red-500" : "text-white"}`} />
                </button>
                <button
                  onClick={onShare}
                  className="p-2 rounded-full backdrop-blur-sm bg-white/30 hover:scale-105 transition shadow"
                  title="Share"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Shop basic info */}
            <div className="mt-4 bg-white rounded-2xl p-4 shadow">

              <h2 className="text-2xl font-semibold">{shop.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{shop.category}</p>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">{shop.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ({shop.reviews?.length ?? 0} reviews)
                  </div>
                </div>
                <div className="text-sm text-gray-500">{shop.distance}</div>
              </div>

              {/* location & status */}
              <div className="mt-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-medium">{shop.address}</div>
                  <div className="text-xs mt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${shop.status === "Open Now"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {shop.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* payment */}
              <div className="mt-4">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" /> Payment
                </div>
                <div className="flex flex-wrap gap-2">
                  {(shop.paymentMethods || []).map((p) => (
                    <span
                      key={p}
                      className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* services */}
              <div className="mt-4">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-blue-600" /> Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {(shop.services || []).map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* offer */}
              {shop.offer?.title && (
                <div className="mt-4 bg-orange-50 border border-orange-100 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-orange-700">
                    {shop.offer.title}
                  </div>
                  {shop.offer.validUntil && (
                    <div className="text-xs text-gray-500 mt-1">
                      Valid until {shop.offer.validUntil}
                    </div>
                  )}
                </div>
              )}

              {/* 🌟 NEW — Business Description */}
              {shop.businessDescription && (
                <div className="mt-5 bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <h3 className="text-sm font-bold text-blue-700 mb-1">
                    Business Details :-
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {shop.businessDescription}
                  </p>
                </div>
              )}

            </div>


            {/* small CTA: visit / call / chat */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => (window.location.href = `tel:${shop.phone}`)}
                className="flex-1 bg-white border border-gray-200 rounded-lg py-3 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] transition"
              >
                <Phone className="w-4 h-4 text-blue-600" /> Call
              </button>

              {shop.chatEnabled && (
                <button
                  onClick={() => navigate(`/chat/${shop.id}`)}
                  className="flex-1 bg-green-600 text-white rounded-lg py-3 shadow-sm flex items-center justify-center gap-2 hover:bg-green-700 transition"
                >
                  <MessageCircle className="w-4 h-4" /> Chat
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT: 2/3 scrollable content */}
        
        <main className="lg:col-span-2 ">
          <div className="mr-900 mt-20">
                <MarketCategories />
              </div>
          <div className="space-y-6 ">
            
            {/* Popular products horizontal slider */}
            <section className="bg-white rounded-2xl p-4 shadow mt-14">
              <div className="flex items-center justify-between mb-3 ">
                <h3 className="text-lg font-semibold">Popular Products</h3>
                <div className="flex gap-2">
                  <button onClick={() => scrollPopular("prev")} className="p-2 rounded bg-gray-100">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollPopular("next")} className="p-2 rounded bg-gray-100">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={popularRef}
                className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar"
                style={{ scrollBehavior: "smooth" }}
                aria-label="Popular products"
              >
                {(shop.products || []).slice(0, 8).map((p) => (
                  <article
                    key={p.id}
                    data-pop-card
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="min-w-[200px] max-w-[220px] bg-gray-50 rounded-lg p-3 flex-shrink-0 shadow-sm cursor-pointer hover:scale-[1.02] transition"
                  >

                    <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-md" />
                    <div className="mt-2">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm font-semibold">₹{p.price}</div>
                        {p.oldPrice && <div className="text-xs line-through text-gray-400">₹{p.oldPrice}</div>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* All products grid */}
            <section className="bg-white rounded-2xl p-4 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">All Products</h3>
                <div className="text-sm text-gray-500">{(shop.products || []).length} items</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(shop.products || []).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-[1.02]"
                  >

                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-md" />
                    <div className="mt-2">
                      <div className="font-medium">{p.name}</div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-sm font-semibold">₹{p.price}</div>
                        {p.oldPrice && <div className="text-xs line-through text-gray-400">₹{p.oldPrice}</div>}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => toggle(p.id)}
                          className="px-3 py-1 text-sm rounded bg-white border"
                          aria-label="Add to favorites"
                        >
                          <Heart className={`w-4 h-4 ${isFav(p.id) ? "text-red-500" : "text-gray-500"}`} />
                        </button>
                        <button
                          onClick={() => {
                            if (navigator.share) navigator.share({ title: p.name, url: window.location.href });
                            else { navigator.clipboard.writeText(window.location.href); alert("Link copied"); }
                          }}
                          className="px-3 py-1 text-sm rounded bg-white border"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="ml-auto bg-blue-600 text-white px-3 py-1 rounded text-sm">Buy</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews & Ratings */}
            <section className="bg-white rounded-2xl p-4 shadow">
              <h3 className="text-lg font-semibold mb-3">Ratings & Reviews</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{shop.rating}</div>
                  <div className="text-sm text-gray-500">/ 5</div>
                </div>
                <div className="text-sm text-gray-500">{shop.reviews?.length ?? 0} reviews</div>
              </div>

              <div className="space-y-3">
                {(shop.reviews || []).map((r) => (
                  <div key={r.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.user}</div>
                      <div className="text-yellow-500">{r.rating} ★</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{r.text}</p>
                  </div>
                ))}

                {/* Add small review form (local only) */}
                <AddReviewBlock shop={shop} />
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* floating quick call */}
      <div className="fixed bottom-6 right-6 z-40 flex gap-3">
        <button
          onClick={() => (window.location.href = `tel:${shop.phone}`)}
          className="bg-white p-3 rounded-full shadow-md"
          aria-label="Call"
        >
          <Phone className="w-5 h-5 text-blue-600" />
        </button>
      </div>
    </div>
  );
}

/* small local review adder (keeps reviews in memory only) */
function AddReviewBlock({ shop }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [localReviews, setLocalReviews] = useState([]);

  const onSend = () => {
    if (!name.trim() || !text.trim()) return alert("Please add name & comment");
    const newR = { id: `local-${Date.now()}`, user: name.trim(), rating, text: text.trim() };
    setLocalReviews((s) => [newR, ...s]);
    setName("");
    setText("");
    setRating(5);
  };

  return (
    <div className="mt-4">
      <div className="text-sm font-medium mb-2">Add a review</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
        <input className="p-2 border rounded col-span-2" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select className="p-2 border rounded" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ★</option>)}
        </select>
      </div>
      <textarea className="w-full mt-2 p-2 border rounded" rows="3" placeholder="Your review" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-2 mt-2">
        <button onClick={onSend} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>

      <div className="mt-4 space-y-3">
        {localReviews.map((r) => (
          <div key={r.id} className="border rounded-lg p-3">
            <div className="flex justify-between">
              <div className="font-medium">{r.user}</div>
              <div className="text-yellow-500">{r.rating} ★</div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
