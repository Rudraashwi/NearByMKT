import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reelsData from "../data/reels.json";
import adsData from "../data/advertisement.json";
import {
  Volume2,
  VolumeX,
  Flame,
  MessageCircle,
  Share2,
  ChevronUp,
  ChevronDown,
  Star,
  StarOff,
  User,
  Music2,
} from "lucide-react";

const LS_KEY = "nbm_reels_v3";

const loadLS = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "null");
  } catch {
    return null;
  }
};
const saveLS = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

export default function Reels() {
  const persisted = loadLS();
  const [reels, setReels] = useState(persisted?.reels?.length ? persisted.reels : []);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [heartBurst, setHeartBurst] = useState(false);
  const [loading, setLoading] = useState(true);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const videoRefs = useRef({});
  const lastTapRef = useRef(0);

  const active = reels[index];
  const activeId = active?.id;

  useEffect(() => {
    try {
      const r = Array.isArray(reelsData) ? reelsData : [];
      const a = Array.isArray(adsData) ? adsData : [];

      const mixed = [];
      r.forEach((reel, i) => {
        const reelWithId = { ...reel, id: reel.id ?? `reel-${i}` };
        mixed.push(reelWithId);

        if ((i + 1) % 5 === 0 && a[Math.floor(i / 5)]) {
          const ad = a[Math.floor(i / 5)];
          const adWithId = { ...ad, id: ad.id ?? `ad-${Math.floor(i / 5)}`, isAd: true };
          mixed.push(adWithId);
        }
      });

      if (!(persisted?.reels?.length)) setReels(mixed);
    } catch (err) {
      console.error("Error preparing reels:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    if (reels.length) saveLS({ reels });
  }, [reels]);

  useEffect(() => {
    Object.values(videoRefs.current).forEach((v) => {
      try {
        v.pause();
      } catch {}
    });
    const v = videoRefs.current[activeId];
    if (v) {
      const tryPlay = () => v.play().catch(() => {});
      try {
        v.currentTime = 0;
      } catch {}
      setTimeout(tryPlay, 30);
    }
  }, [activeId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") next();
      if (e.key === "ArrowUp") prev();
      if (e.key === "m" || e.key === "M") setMuted((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, reels.length]);

  const next = () => setIndex((i) => Math.min(i + 1, reels.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const toggleLike = (id) => {
    setReels((rs) =>
      rs.map((r) =>
        r.id === id ? { ...r, likes: (r.likes ?? 0) + (r._liked ? -1 : 1), _liked: !r._liked } : r
      )
    );
  };

  const toggleFav = (id) => {
    setReels((rs) => rs.map((r) => (r.id === id ? { ...r, faved: !r.faved } : r)));
  };

  const onDoubleTap = (e) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      toggleLike(activeId);
      setHeartBurst(true);
      setFloatingHearts((h) => [
        ...h,
        { id: Date.now(), x: e.clientX, y: e.clientY, emoji: "❤️" },
      ]);
      setTimeout(() => setHeartBurst(false), 600);
    }
    lastTapRef.current = now;
  };

  const share = async () => {
    const url = window.location.href + `#reel=${activeId}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "NearBy MKT Reel", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black text-lg tracking-wide">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          Loading Reels...
        </motion.span>
      </div>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-900 to-black"
      style={{ marginTop: "2.15cm", height: "calc(100vh - 2.15cm)" }}
    >
      <div className="h-full max-w-md mx-auto flex items-center justify-center px-4">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.6)] bg-black">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active?.id ?? "empty"}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {active?.isAd ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-white to-gray-100 text-center p-6"
                >
                  <motion.img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-64 object-cover rounded-2xl shadow mb-4"
                    whileHover={{ scale: 1.03 }}
                  />
                  <h2 className="text-xl font-semibold mb-2">{active.title}</h2>
                  <p className="text-gray-600 mb-3">{active.brand}</p>
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition shadow-lg hover:shadow-xl"
                  >
                    {active.cta}
                  </a>
                </motion.div>
              ) : active ? (
                <>
                  <motion.video
                    ref={(el) => {
                      if (el && active?.id) videoRefs.current[active.id] = el;
                    }}
                    src={active.src || active.video}
                    autoPlay
                    muted={muted}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onClick={() => setMuted((m) => !m)}
                    onDoubleClick={onDoubleTap}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white">No reels.</div>
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute text-4xl pointer-events-none select-none"
                style={{ left: h.x - 15, top: h.y - 15 }}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -100, scale: 1.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                onAnimationComplete={() =>
                  setFloatingHearts((arr) => arr.filter((x) => x.id !== h.id))
                }
              >
                {h.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {!active?.isAd && active && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm px-5 py-2 rounded-full border border-white/20 shadow-md">
              <Music2 className="animate-pulse" size={16} />
              <span>{active?.song || "Original Audio"}</span>
            </div>
          )}

          {!active?.isAd && active && (
            <div className="absolute left-3 top-3 bottom-3 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: muted ? <VolumeX /> : <Volume2 />,
                    onClick: () => setMuted((m) => !m),
                    title: "Mute",
                  },
                  {
                    icon: <Flame />,
                    onClick: () => toggleLike(activeId),
                    title: "Like",
                    label: active?.likes ?? 0,
                  },
                  {
                    icon: <MessageCircle />,
                    onClick: () => setShowComments(true),
                    title: "Comments",
                    label: active?.comments?.length ?? 0,
                  },
                  { icon: <Share2 />, onClick: share, title: "Share" },
                ].map((b, i) => (
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    key={i}
                    onClick={b.onClick}
                    className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition shadow"
                    title={b.title}
                  >
                    {b.icon}
                    {b.label !== undefined && (
                      <span className="block text-xs mt-1 opacity-90 text-center">{b.label}</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              disabled={index === 0}
              className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 disabled:opacity-40 shadow transition"
            >
              <ChevronUp />
            </motion.button>

            {!active?.isAd && active && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFav(activeId)}
                className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition"
                title="Save to favourites"
              >
                {active?.faved ? <Star className="text-yellow-300" /> : <StarOff />}
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={next}
              disabled={index === reels.length - 1}
              className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 disabled:opacity-40 shadow transition"
            >
              <ChevronDown />
            </motion.button>
          </div>

          {!active?.isAd && active && (
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-3">
                {active?.profilePic ? (
                  <img
                    src={active.profilePic}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border border-white/30 shadow"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <User />
                  </div>
                )}
                <div className="backdrop-blur-sm bg-black/25 px-3 py-1.5 rounded-full border border-white/10 shadow">
                  <span className="font-semibold">{active?.profileName || "@user"}</span>
                </div>
              </div>
              <p className="mt-2 max-w-[75%] text-sm leading-relaxed drop-shadow">{active?.caption}</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComments(false)}
            />
            <motion.aside
              className="fixed right-0 top-[2.4cm] bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Comments</h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="px-3 py-1 rounded hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {active?.comments?.length ? (
                  active.comments.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 border rounded-xl px-3 py-2 shadow-sm"
                    >
                      {c}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}
              </div>

              <div className="p-3 border-t flex gap-2">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a vibe..."
                  className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => {
                    const txt = newComment.trim();
                    if (!txt) return;
                    setReels((rs) =>
                      rs.map((r) =>
                        r.id === activeId ? { ...r, comments: [...(r.comments || []), txt] } : r
                      )
                    );
                    setNewComment("");
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
