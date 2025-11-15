// src/pages/FoodDetails.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Heart, Share2, Trash2 } from "lucide-react";
import data from "../data/food.json";

const LS_FAV = "nbm_fav_shop";
const LS_CART = "nbm_cart_v2";

/**
 * Upgrades:
 * - Proper +/- counters
 * - Add to Cart (persisted)
 * - Floating cart button (shows total qty)
 * - Clean card layout (image left, details right)
 * - Enhanced Reviews UI (avg, avatars, responsive)
 * - Keeps previous behaviors: photo slider, offers, fav, share
 */

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopId = Number(id || 1);

  const shop = useMemo(() => data.find((s) => s.id === shopId) || data[0], [shopId]);

  // photo slider
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoTimerRef = useRef(null);

  // offers slider
  const [offerIndex, setOfferIndex] = useState(0);

  // favorites
  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_FAV);
      if (!raw) return false;
      return JSON.parse(raw) === shop.id;
    } catch {
      return false;
    }
  });

  // qty local (per item before adding to cart)
  const [qty, setQty] = useState({}); // { itemId: number }

  // cart persisted (object keyed by itemId)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_CART) || "{}";
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });

  // sample reviews - you can replace with real dynamic reviews later
  const sampleReviews = [
    { id: "r1", name: "Aman", rating: 5, text: "Lovely frames and quick shipping. Highly recommended!" },
    { id: "r2", name: "Priya", rating: 4, text: "Good quality. Price is fair." }
  ];

  // slider timers
  useEffect(() => {
    if (!shop?.images?.length) return;
    photoTimerRef.current = setInterval(() => {
      setPhotoIndex((p) => (p + 1) % shop.images.length);
    }, 3500);
    return () => clearInterval(photoTimerRef.current);
  }, [shop]);

  useEffect(() => {
    const t = setInterval(() => setOfferIndex((i) => (i + 1) % (shop.offers?.length || 1)), 4200);
    return () => clearInterval(t);
  }, [shop]);

  // persist favorite
  useEffect(() => {
    try {
      localStorage.setItem(LS_FAV, fav ? JSON.stringify(shop.id) : "");
    } catch {}
  }, [fav, shop]);

  // persist cart on change
  useEffect(() => {
    try {
      localStorage.setItem(LS_CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // helper: total items in cart
  const cartTotalQty = Object.values(cart).reduce((acc, it) => acc + (it.qty || 0), 0);

  // adjust local qty (not yet added to cart)
  function changeLocalQty(itemId, delta) {
    setQty((s) => {
      const cur = s[itemId] || 0;
      const next = Math.max(0, cur + delta);
      return { ...s, [itemId]: next };
    });
  }

  // add item to cart (persisted)
  function addToCart(item) {
    const q = qty[item.id] || 1; // default 1 if user hasn't tapped + yet
    if (q <= 0) return;
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[item.id]) {
        // update existing
        copy[item.id] = { ...copy[item.id], qty: copy[item.id].qty + q };
      } else {
        // minimal item data stored
        copy[item.id] = { id: item.id, name: item.name, price: item.price, image: item.image, qty: q };
      }
      return copy;
    });

    // reset local qty for that item
    setQty((s) => ({ ...s, [item.id]: 0 }));
  }

  function removeFromCart(itemId) {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  }

  function openCart() {
    navigate("/cart");
  }

  function shareShop() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: shop.name, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard"));
    }
  }

  // responsive helper: rating average from sample reviews + shop.rating
  const avgRating = Number(shop.rating || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-blue-100 pt-[2.2cm]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT - sticky */}
          <aside className="w-full lg:w-1/3 lg:sticky top-[2.2cm] self-start">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* slider */}
              <div className="relative h-64 sm:h-72">
                {shop.images?.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`${shop.name}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i === photoIndex ? 1 : 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}

                {/* dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {shop.images?.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={`w-2 h-2 rounded-full ${i === photoIndex ? "bg-white" : "bg-white/40"}`}
                    />
                  ))}
                </div>

                {/* icons */}
                <div className="absolute top-3 right-3 flex flex-col gap-3">
                  <button onClick={() => setFav((v) => !v)} className="p-2 bg-white/80 rounded-full shadow">
                    <Heart className={`w-5 h-5 ${fav ? "text-red-500" : "text-gray-700"}`} />
                  </button>
                  <button onClick={shareShop} className="p-2 bg-white/80 rounded-full shadow">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h1 className="text-2xl font-bold text-gray-800">{shop.name}</h1>
                <p className="text-sm text-gray-500">{shop.category}</p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5" />
                    <div className="font-semibold text-gray-800">{avgRating.toFixed(1)}</div>
                  </div>
                  <div className="text-sm text-gray-500 ml-auto">{shop.distance}</div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div className="text-sm">{shop.address}</div>
                </div>

                <div className="mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${shop.status === "Open Now" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {shop.status}
                  </span>
                </div>

                {/* offers */}
                <div className="mt-4">
                  <div className="rounded-xl bg-orange-50 border border-orange-200 p-3">
                    <motion.div key={offerIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                      <div className="font-semibold text-orange-700">{shop.offers?.[offerIndex]?.title || "No offers right now"}</div>
                      <div className="text-xs text-orange-500">{shop.offers?.[offerIndex]?.subtitle}</div>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button onClick={() => (window.location.href = `tel:${shop.phone}`)} className="flex-1 py-3 rounded-lg bg-blue-600 text-white shadow">Call</button>
                  <button onClick={() => navigate(`/chat/${shop.id}`)} className="flex-1 py-3 rounded-lg bg-green-600 text-white shadow">Chat</button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT - content */}
          <div className="flex-1 space-y-6">
            {/* Popular (top picks) */}
            <div className="bg-white rounded-2xl p-4 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Popular Products</h3>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shop.topPicks?.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border p-3 flex flex-col">
                    <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
                    <div className="mt-3 flex justify-between items-start">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-gray-500">₹{p.price}</div>
                      </div>

                      {/* small counter + add */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty((s) => ({ ...s, [p.id]: Math.max(0, (s[p.id] || 0) - 1) }))}
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                          >-</button>

                          <div className="w-8 text-center">{qty[p.id] || 0}</div>

                          <button
                            onClick={() => setQty((s) => ({ ...s, [p.id]: (s[p.id] || 0) + 1 }))}
                            className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"
                          >+</button>
                        </div>

                        <button
                          onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })}
                          className="mt-2 bg-gray-950 text-white px-3 py-1 rounded-lg"
                        >
                          🛒
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Products / menu */}
            <div className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">All Products</h3>
                <div className="text-gray-400 text-sm">{shop.menu?.reduce((a, c) => a + c.items.length, 0)} items</div>
              </div>

              <div className="mt-4 space-y-6">
                {shop.menu?.map((cat) => (
                  <div key={cat.category}>
                    <h4 className="font-semibold">{cat.category} <span className="text-sm text-gray-400">({cat.count})</span></h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                      {cat.items.map((it) => (
                        <article key={it.id} className="bg-white rounded-xl shadow-sm border p-3 flex">
                          {/* image */}
                          <img src={it.image} alt={it.name} className="w-28 h-24 object-cover rounded-lg flex-shrink-0" />

                          {/* details */}
                          <div className="ml-3 flex-1 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div className="max-w-[60%]">
                                <div className="font-semibold text-gray-800">{it.name}</div>
                                <div className="text-xs text-gray-500 truncate">{it.desc}</div>
                              </div>

                              <div className="text-right">
                                <div className="font-semibold">₹{it.price}</div>
                                <div className="text-xs text-yellow-500 flex items-center gap-1 mt-1">
                                  <Star className="w-3 h-3" /> {it.rating} <span className="text-gray-400">({it.reviews})</span>
                                </div>
                              </div>
                            </div>

                            {/* bottom row: counter + details + add to cart */}
                            <div className="mt-auto flex items-center gap-3 pt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => changeLocalQty(it.id, -1)}
                                  className="w-8 h-8 rounded-full border flex items-center justify-center"
                                  aria-label="decrease"
                                >
                                  -
                                </button>

                                <div className="w-8 text-center">{qty[it.id] || 0}</div>

                                <button
                                  onClick={() => changeLocalQty(it.id, +1)}
                                  className=" w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"
                                  aria-label="increase"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => addToCart(it)}
                                className="ml-auto bg-gray-950 text-white px-4 py-1 rounded-lg "
                                aria-label="add-to-cart"
                              >
                                🛒
                              </button>

                              <button className="px-3 py-1 border rounded-lg text-sm">Details</button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-5 shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Ratings & Reviews</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-4xl font-bold text-gray-800">{avgRating.toFixed(1)}</div>
                    <div>
                      <div className="text-sm text-gray-500">based on {sampleReviews.length} reviews</div>

                      {/* small star bar */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4" /><Star className="w-4 h-4" /><Star className="w-4 h-4" /><Star className="w-4 h-4" /><Star className="w-4 h-4" />
                        </div>
                        <div className="text-sm text-gray-500">{avgRating.toFixed(1)} / 5</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* quick aggregated bars (example) */}
                <div className="w-full md:w-1/3">
                  {/** mapping 5..1 */}
                  {[5,4,3,2,1].map((r) => {
                    const count = sampleReviews.filter(s => s.rating === r).length;
                    const total = sampleReviews.length || 1;
                    const pct = Math.round((count/total)*100);
                    return (
                      <div key={r} className="flex items-center gap-2 text-sm">
                        <div className="w-8">{r}★</div>
                        <div className="flex-1 bg-gray-100 h-2 rounded overflow-hidden">
                          <div style={{ width: `${pct}%` }} className="bg-yellow-400 h-2"></div>
                        </div>
                        <div className="w-8 text-right text-gray-500">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {sampleReviews.map((r) => (
                  <div key={r.id} className="border rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">{r.name.charAt(0)}</div>
                        <div>
                          <div className="font-semibold">{r.name}</div>
                          <div className="text-xs text-gray-400">{new Date().toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-yellow-500 font-semibold">{r.rating} ★</div>
                    </div>

                    <p className="mt-2 text-gray-600">{r.text}</p>
                  </div>
                ))}
              </div>

              {/* Add review form */}
              <div className="mt-6">
                <h4 className="font-semibold">Add a review</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <input placeholder="Your name" className="border p-2 rounded-lg" />
                  <select className="border p-2 rounded-lg">
                    <option>5 ★</option>
                    <option>4 ★</option>
                    <option>3 ★</option>
                    <option>2 ★</option>
                    <option>1 ★</option>
                  </select>
                </div>

                <textarea placeholder="Your review" rows="3" className="border p-2 rounded-lg w-full mt-3" />

                <div className="flex gap-3 mt-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <div className="fixed right-4 bottom-6 z-50">
        <div className="flex items-center gap-3">
          <button onClick={openCart} className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-3">
            <div className="font-semibold">Cart</div>
            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">{cartTotalQty}</div>
          </button>

          {/* mini dropdown showing cart items (optional) */}
          <div className="hidden md:block bg-white rounded-xl shadow p-3 w-72">
            <div className="font-semibold mb-2">Cart</div>
            {Object.keys(cart).length === 0 ? (
              <div className="text-sm text-gray-500">Cart is empty</div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-auto">
                {Object.values(cart).map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <img src={c.image} alt={c.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">Qty: {c.qty} • ₹{c.price}</div>
                    </div>
                    <button onClick={() => removeFromCart(c.id)} className="p-2 rounded-full border">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="mt-2 flex justify-between items-center">
                  <div className="font-semibold">Total</div>
                  <div className="font-semibold">
                    ₹{Object.values(cart).reduce((acc, it) => acc + it.qty * it.price, 0)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
