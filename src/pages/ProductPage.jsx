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

    // LOAD PRODUCT (API + fallback JSON)
    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await fetch(`/api/products/${productId}`);
                if (!res.ok) throw new Error("api fail");
                const json = await res.json();
                if (!mounted) return;
                setProduct(json);
                setSelectedColor(json.colors?.[0] || null);
                setMainIdx(0);

            } catch (e) {
                try {
                    const json = await import("../data/productPage.json");
                    const list = json.default ?? json;
                    const p = list.find((x) => Number(x.id) === productId) || list[0];
                    if (!mounted) return;
                    setProduct(p);
                    setSelectedColor(p.colors?.[0] || null);
                    setMainIdx(0);
                } catch (err) {
                    console.error("Failed to load product:", err);
                }
            }
        }
        load();
        return () => (mounted = false);
    }, [productId]);

    // IMAGES
    const displayImages = useMemo(() => {
        if (!product) return [];
        if (selectedColor && selectedColor.image) {
            const rest = product.images.filter((i) => i !== selectedColor.image);
            return [selectedColor.image, ...rest];
        }
        return product.images || [];
    }, [product, selectedColor]);

    useEffect(() => setMainIdx(0), [selectedColor]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500">Loading product...</div>
            </div>
        );
    }

    const onAddToCart = () => {
        const payload = {
            productId: product.id,
            qty,
            engraving: engraving.trim() || null,
            color: selectedColor?.name || null,
        };
        console.log("Add to cart:", payload);
        alert("Added to cart (demo)");
    };

    const toggleFav = () => setFav((s) => !s);

    return (
        <div className="w-full bg-gray-100 min-h-screen pt-20 pb-20">
            <div className="max-w-10xl mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ---------------- LEFT: IMAGE GALLERY ---------------- */}
                    <div>

                        {/* MAIN IMAGE BOX */}
                        <div className="relative bg-white rounded-xl shadow-lg border p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={displayImages[mainIdx]}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.25 }}
                                    className="w-full"
                                >
                                    <div className="w-full h-[450px] lg:h-[520px] flex items-center justify-center rounded-xl overflow-hidden bg-gray-50">
                                        <img
                                            src={displayImages[mainIdx]}
                                            alt={product.name}
                                            className="w-full h-full object-contain select-none"
                                            draggable={false}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Arrows */}
                            <button
                                onClick={() =>
                                    setMainIdx((i) =>
                                        displayImages.length
                                            ? (i - 1 + displayImages.length) %
                                              displayImages.length
                                            : 0
                                    )
                                }
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full hover:bg-gray-100"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                onClick={() =>
                                    setMainIdx((i) =>
                                        displayImages.length
                                            ? (i + 1) % displayImages.length
                                            : 0
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full hover:bg-gray-100"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* THUMBNAILS */}
                        <div className="flex items-center gap-3 mt-4 overflow-x-auto hide-scrollbar">
                            {displayImages.map((img, i) => (
                                <button
                                    key={img + i}
                                    onClick={() => setMainIdx(i)}
                                    className={`border rounded-lg p-1 bg-white shadow-sm transition ${
                                        i === mainIdx
                                            ? "border-blue-600 shadow-md"
                                            : "hover:shadow"
                                    }`}
                                >
                                    <img
                                        src={img}
                                        className="w-24 h-20 object-contain"
                                        alt=""
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ---------------- RIGHT: DETAILS ---------------- */}
                    <div className="bg-white rounded-xl shadow p-6 border">

                        {/* Title + Fav */}
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {product.name}
                                </h1>
                                {product.subtitle && (
                                    <p className="text-sm mt-1 text-gray-600">
                                        {product.subtitle}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={toggleFav}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                            >
                                <Heart
                                    size={20}
                                    className={fav ? "text-pink-500" : "text-gray-700"}
                                />
                            </button>
                        </div>

                        {/* Price */}
                        <div className="mt-5">
                            <div className="text-3xl font-semibold text-gray-900">
                                ₹{product.price}
                            </div>
                            <div className="text-sm text-green-700 font-medium mt-1">
                                Inclusive of taxes
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="text-sm mt-2 text-gray-700">
                            {product.stock > 0 ? (
                                <span className="text-green-600">
                                    {product.stock} items available
                                </span>
                            ) : (
                                <span className="text-red-600">Out of stock</span>
                            )}
                        </div>

                        {/* Colors */}
                        {product.colors?.length > 0 && (
                            <div className="mt-6">
                                <div className="font-medium mb-2">Color</div>
                                <div className="flex gap-3 flex-wrap">
                                    {product.colors.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelectedColor(c)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded border transition ${
                                                selectedColor?.name === c.name
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-300 bg-white"
                                            }`}
                                        >
                                            <span
                                                className="w-5 h-5 rounded"
                                                style={{
                                                    background: c.hex,
                                                    boxShadow:
                                                        "inset 0 0 0 1px rgba(0,0,0,0.15)",
                                                }}
                                            />
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Engraving + Qty */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Engraving */}
                            <div className="sm:col-span-2">
                                <label className="text-sm font-medium text-gray-800">
                                    Add Name / Message
                                </label>
                                <input
                                    value={engraving}
                                    onChange={(e) => setEngraving(e.target.value)}
                                    placeholder="Type here..."
                                    className="mt-2 w-full border px-3 py-2 rounded-lg text-gray-900 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                />
                                {product.engravable && (
                                    <p className="text-xs text-gray-600 mt-1">
                                        Extra: ₹{product.engravingPrice || 0}
                                    </p>
                                )}
                            </div>

                            {/* Qty */}
                            <div>
                                <label className="text-sm font-medium text-gray-800">
                                    Quantity
                                </label>
                                <div className="flex mt-2 items-center gap-2">
                                    <button
                                        onClick={() =>
                                            setQty((q) => Math.max(1, q - 1))
                                        }
                                        className="px-3 py-2 rounded border bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <input
                                        value={qty}
                                        onChange={(e) =>
                                            setQty(Number(e.target.value || 1))
                                        }
                                        className="w-16 text-center border rounded py-2"
                                    />
                                    <button
                                        onClick={() => setQty((q) => q + 1)}
                                        className="px-3 py-2 rounded border bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={onAddToCart}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </div>
                            </button>

                            <button className="px-6 py-3 border rounded-lg bg-white hover:bg-gray-50">
                                Buy Now
                            </button>
                        </div>

                        {/* Features */}
                        {product.features && (
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.features.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <div className="w-2 h-2 mt-1 bg-blue-600 rounded-full" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Specifications */}
                        <div className="mt-8 border-t pt-4">
                            <button
                                onClick={() => setSpecOpen((s) => !s)}
                                className="flex justify-between w-full text-left"
                            >
                                <span className="font-medium text-gray-900">
                                    Specifications
                                </span>
                                <span className="text-gray-600">
                                    {specOpen ? "Hide" : "Show"}
                                </span>
                            </button>

                            <AnimatePresence>
                                {specOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                        }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden mt-3"
                                    >
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                            {product.specifications &&
                                                Object.entries(
                                                    product.specifications
                                                ).map(([k, v]) => (
                                                    <div key={k}>
                                                        <div className="text-xs text-gray-500 uppercase">
                                                            {k}
                                                        </div>
                                                        <div>{v}</div>
                                                    </div>
                                                ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Reviews */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold">
                                Customer Reviews
                            </h3>
                            <div className="mt-3 space-y-3">
                                {(product.reviews || [])
                                    .slice(0, 3)
                                    .map((r) => (
                                        <div
                                            key={r.id}
                                            className="p-3 bg-gray-50 rounded border"
                                        >
                                            <div className="flex justify-between">
                                                <span className="font-medium">
                                                    {r.user}
                                                </span>
                                                <span className="text-yellow-500">
                                                    {r.rating} ★
                                                </span>
                                            </div>
                                            <p className="text-sm mt-1 text-gray-700">
                                                {r.text}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------------- RELATED PRODUCTS ---------------- */}
                <h3 className="text-lg font-semibold mt-12 mb-4">
                    Related Products
                </h3>

                <div className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar">
                    {(product.relatedProducts || []).map((rp) => (
                        <div
                            key={rp.id}
                            className="min-w-[180px] bg-white rounded-lg shadow p-3 border"
                        >
                            <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                                <img
                                    src={rp.image}
                                    className="w-full h-full object-contain"
                                    alt=""
                                />
                            </div>
                            <div className="mt-2 text-sm text-gray-900 font-medium">
                                {rp.name}
                            </div>
                            <div className="text-sm text-gray-700">
                                ₹{rp.price}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
