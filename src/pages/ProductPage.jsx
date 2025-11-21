// src/pages/ProductPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    RotateCw,
} from "lucide-react";

export default function ProductPage() {
    const { id } = useParams();
    const productId = Number(id || 1);

    const [product, setProduct] = useState(null);
    const [mainIdx, setMainIdx] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [qty, setQty] = useState(1);
    const [engraving, setEngraving] = useState("");
    const [fav, setFav] = useState(false);
    const [specOpen, setSpecOpen] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await fetch(`/api/products/${productId}`);
                if (!res.ok) throw new Error("api fail");
                const json = await res.json();
                if (!mounted) return;
                setProduct(json);
                setSelectedColor((json.colors && json.colors[0]) || null);
                setMainIdx(0);
            } catch (e) {
                // fallback to local JSON
                try {
                    // local file placed at src/data/productPage.json
                    const json = await import("../data/productPage.json");
                    const list = json.default ?? json;
                    const p = list.find((x) => Number(x.id) === productId) || list[0];
                    if (!mounted) return;
                    setProduct(p);
                    setSelectedColor((p.colors && p.colors[0]) || null);
                    setMainIdx(0);
                } catch (err) {
                    console.error("Failed to load product:", err);
                }
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, [productId]);

    // derived display images depending on selected color (if color has image)
    const displayImages = useMemo(() => {
        if (!product) return [];
        if (selectedColor && selectedColor.image) {
            // Move color image to front if provided
            const remaining = product.images.filter((i) => i !== selectedColor.image);
            return [selectedColor.image, ...remaining];
        }
        return product.images || [];
    }, [product, selectedColor]);

    useEffect(() => {
        setMainIdx(0);
    }, [selectedColor]);

    if (!product) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1220] to-[#03050a]"
                style={{ marginTop: "2.4cm" }}
            >
                <div className="text-gray-300">Loading product...</div>
            </div>
        );
    }

    const onAddToCart = () => {
        // placeholder — integrate real cart API later
        const payload = {
            productId: product.id,
            qty,
            engraving: engraving.trim() || null,
            color: selectedColor?.name || null,
        };
        console.log("Add to cart:", payload);
        // TODO: POST /api/cart
        alert("Added to cart (demo). Check console for payload.");
    };

    const toggleFav = () => setFav((s) => !s);

    return (
        <div
            className="min-h-screen bg-linear-to-b  from-gray-500 to-blue-100 py-12"
            style={{ marginTop: "0.9cm" }}
        >
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: gallery */}
                    <div className="space-y-4">
                        <div className="relative bg-gray-200 rounded-2xl p-4 lg:p-6 shadow-2xl">
                            <div className="absolute -left-6 -top-6 hidden lg:block">
                                <div className="text-xs text-gray-400">LIVE</div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={displayImages[mainIdx] || mainIdx}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.99 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full flex items-center justify-center"
                                >
                                    {/* Hero image container: responsive heights */}
                                    <div className="w-full h-[420px] sm:h-[460px] md:h-[520px] lg:h-[520px] flex items-center justify-center rounded-xl overflow-hidden bg-white/5">
                                        <img
                                            src={displayImages[mainIdx]}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-xl select-none"
                                            draggable={false}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* left/right arrows for big image */}
                            <button
                                onClick={() =>
                                    setMainIdx((i) =>
                                        displayImages.length ? (i - 1 + displayImages.length) % displayImages.length : 0
                                    )
                                }
                                aria-label="previous"
                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/8 hover:bg-white/12 transition"
                            >
                                <ChevronLeft size={20} className="text-white" />
                            </button>
                            <button
                                onClick={() =>
                                    setMainIdx((i) => (displayImages.length ? (i + 1) % displayImages.length : 0))
                                }
                                aria-label="next"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/8 hover:bg-white/12 transition"
                            >
                                <ChevronRight size={20} className="text-white" />
                            </button>
                        </div>

                        {/* thumbnails */}
                        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar px-1">
                            {displayImages.map((img, i) => (
                                <motion.button
                                    key={img + i}
                                    onClick={() => setMainIdx(i)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-shrink-0 border rounded-lg p-1 transition ${i === mainIdx ? "ring-2 ring-blue-500" : "hover:scale-105"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`thumb-${i}`}
                                        className={`w-28 h-16 sm:w-32 sm:h-20 object-cover rounded ${i === mainIdx ? "opacity-100" : "opacity-90"}`}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right: details */}
                    <div className="text-gray-900">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
                                {product.subtitle && (
                                    <p className="text-sm text-gray-600 mt-2">{product.subtitle}</p>
                                )}
                            </div>

                            <div className="ml-auto flex items-center gap-3">
                                <motion.button
                                    onClick={toggleFav}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg bg-white/6 hover:bg-white/10 transition shadow"
                                    title="Favorite"
                                >
                                    <Heart size={18} className={fav ? "text-pink-500" : "text-gray-700"} />
                                </motion.button>
                                <motion.button
                                    onClick={() => alert("Quick reload demo")}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg bg-white/6 hover:bg-white/10 transition shadow"
                                    title="Refresh"
                                >
                                    <RotateCw size={18} className="text-gray-700" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Price & stock */}
                        <div className="mt-6 flex items-center gap-6">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {/* ALWAYS show Rupee sign as requested */}
                                    ₹{product.price}
                                </div>
                                <div className="text-sm text-gray-600">Inclusive of taxes (if applicable)</div>
                            </div>

                            <div className="ml-auto text-sm text-gray-600">
                                <span className="px-2 py-1 rounded bg-white/6">
                                    {product.stock !== undefined ? (product.stock > 0 ? `${product.stock} in stock` : "Out of stock") : "In Stock"}
                                </span>
                            </div>
                        </div>

                        {/* Color selector */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mt-6">
                                <div className="text-sm text-gray-700 mb-2 font-medium">Color</div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {product.colors.map((c) => (
                                        <motion.button
                                            key={c.name}
                                            onClick={() => setSelectedColor(c)}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition border ${selectedColor?.name === c.name ? "border-blue-500 bg-white/6" : "border-gray-200 bg-white/50"
                                                }`}
                                        >
                                            <span
                                                className="w-5 h-5 rounded"
                                                style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)" }}
                                            />
                                            <span className="text-sm text-gray-800">{c.name}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Engraving & qty */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                                <label className="text-sm text-gray-700">Add Name / Message</label>

                                <input
                                    value={engraving}
                                    onChange={(e) => setEngraving(e.target.value)}
                                    placeholder="Type the name or message..."
                                    className="w-full mt-2 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                                />

                                {product.engravable && (
                                    <div className="text-xs text-gray-600 mt-1">
                                        Extra Cost: {product.engravingPrice ? `₹${product.engravingPrice}` : "-"}
                                    </div>
                                )}
                            </div>
                        


                        <div>
                            <label className="text-sm text-gray-700">Qty</label>
                            <div className="mt-2 flex items-center gap-2">
                                <button
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="px-3 py-2 bg-white border border-gray-200 rounded-md"
                                    aria-label="decrease"
                                >
                                    -
                                </button>
                                <input
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value || 1))}
                                    className="w-16 text-center bg-white border border-gray-200 rounded px-2 py-2"
                                />
                                <button
                                    onClick={() => setQty((q) => q + 1)}
                                    className="px-3 py-2 bg-white border border-gray-200 rounded-md"
                                    aria-label="increase"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add to cart */}
                    <div className="mt-6 flex items-center gap-4">
                        <motion.button
                            onClick={onAddToCart}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-lg transition"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <ShoppingCart size={18} /> Add to cart
                            </div>
                        </motion.button>

                        <motion.button
                            onClick={() => alert("Buy now demo")}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-800"
                        >
                            Buy now
                        </motion.button>
                    </div>

                    {/* Features list */}
                    {product.features && (
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {product.features.map((f, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-sm text-blue-700">•</div>
                                    <div className="text-sm text-gray-700">{f}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Specs accordion */}
                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <button
                            onClick={() => setSpecOpen((s) => !s)}
                            className="flex items-center justify-between w-full"
                        >
                            <div className="text-sm font-medium text-gray-800">Specifications</div>
                            <div className="text-sm text-gray-600">{specOpen ? "Hide" : "Show"}</div>
                        </button>

                        <AnimatePresence>
                            {specOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden mt-3 text-sm text-gray-700"
                                >
                                    <div className="grid grid-cols-2 gap-2">
                                        {product.specifications &&
                                            Object.entries(product.specifications).map(([k, v]) => (
                                                <div key={k} className="py-2">
                                                    <div className="text-xs text-gray-500 capitalize">{k}</div>
                                                    <div className="text-sm text-gray-800">{v}</div>
                                                </div>
                                            ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Reviews */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Customer reviews</h3>
                            <div className="text-sm text-gray-600">{(product.reviews || []).length} reviews</div>
                        </div>

                        <div className="mt-4 space-y-3">
                            {(product.reviews || []).slice(0, 3).map((r) => (
                                <div key={r.id} className="bg-white/80 p-3 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-gray-900">{r.user}</div>
                                        <div className="text-yellow-500 font-semibold">{r.rating} ★</div>
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1">{r.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related products slider */}
            <div className="mt-10 bg-white/0 p-4 rounded-lg overflow-hidden">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Related products</h4>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                    {(product.relatedProducts || []).map((rp) => (
                        <motion.div
                            key={rp.id}
                            whileHover={{ scale: 1.03 }}
                            className="min-w-[180px] bg-white rounded-lg p-3 shadow-sm flex-shrink-0"
                        >
                            <div className="w-full h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                <img src={rp.image} alt={rp.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-2">
                                <div className="text-sm font-medium text-gray-900">{rp.name}</div>
                                <div className="text-sm text-gray-700 mt-1">₹{rp.price}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div >
  );
}
