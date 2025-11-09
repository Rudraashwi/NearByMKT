
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, VolumeX, Flame, MessageCircle, Share2, Upload,
  ChevronUp, ChevronDown, Star, StarOff, User
} from "lucide-react";

import reel1 from "../assets/r1.mp4";
import reel2 from "../assets/r2.mp4";
import avatar from "../assets/9.png";

// ---------------- localStorage helpers ----------------
const LS_KEY = "nbm_reels_v1";
const loadLS = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "null"); }
  catch { return null; }
};
const saveLS = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

// ---------------- demo reels (can be empty) -----------
const seedReels = [
  {
    id: "demo-1",
    src: reel1,
    song: "Night Drive – Synthwave",
    profileName: "@nearby.mkt",
    profilePic: avatar,
    caption: "Smart market • smart city • smart life ✨",
    likes: 128,
    comments: ["🔥", "Nice vibe!", "Clean cuts!"],
    faved: false,
  },
  {
    id: "demo-2",
    src: reel2,
    song: "Indie Chill – Summer Loop",
    profileName: "@vibe.studio",
    profilePic: avatar,
    caption: "Groceries managed like magic. #NearByMKT",
    likes: 256,
    comments: [],
    faved: true,
  },
];

export default function Reels() {
  const persisted = loadLS();
  const [reels, setReels] = useState(persisted?.reels?.length ? persisted.reels : seedReels);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [heartBurst, setHeartBurst] = useState(false);

  const fileRef = useRef(null);
  const videoRefs = useRef({});
  const lastTapRef = useRef(0);

  const active = reels[index];
  const activeId = active?.id;

  useEffect(() => { saveLS({ reels }); }, [reels]);

  useEffect(() => {
    Object.values(videoRefs.current).forEach((v) => { try { v.pause(); } catch {} });
    const v = videoRefs.current[activeId];
    if (v) {
      const tryPlay = () => v.play().catch(() => {});
      v.currentTime = 0;
      // iOS sometimes needs a small delay after source switch
      setTimeout(tryPlay, 30);
    }
  }, [activeId]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown") next();
      if (e.key === "ArrowUp") prev();
      if (e.key === "m" || e.key === "M") setMuted((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const next = () => setIndex((i) => Math.min(i + 1, reels.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const toggleLike = (id) => {
    setReels((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, likes: r._liked ? r.likes - 1 : r.likes + 1, _liked: !r._liked }
          : r
      )
    );
  };

  const toggleFav = (id) => {
    setReels((rs) => rs.map((r) => (r.id === id ? { ...r, faved: !r.faved } : r)));
  };

  const onDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      toggleLike(activeId);
      // heart burst animation
      setHeartBurst(true);
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

  // upload (< 60s) — makes an object URL
  const onPick = () => fileRef.current?.click();
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.src = url;
    probe.onloadedmetadata = () => {
      const dur = probe.duration || 0;
      if (dur > 60.05) {
        URL.revokeObjectURL(url);
        alert("Please upload a video under 60 seconds.");
        return;
      }
      const newReel = {
        id: "upl-" + Date.now(),
        src: url,
        song: "Original Audio",
        profileName: "@you",
        profilePic: avatar,
        caption: "My new reel ✨",
        likes: 0,
        comments: [],
        faved: false,
      };
      setReels((rs) => [newReel, ...rs]);
      setIndex(0);
      alert("Reel uploaded!");
    };
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ marginTop: "2.4cm", height: "calc(100vh - 2.4cm)" }}
    >
      <div className="h-full max-w-md mx-auto flex items-center justify-center px-4">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-black">
          {/* ----- video pane ----- */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active?.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              {active && (
                <video
                  ref={(el) => { if (el) videoRefs.current[active.id] = el; }}
                  src={active.src}
                  autoPlay
                  muted={muted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onClick={() => setMuted((m) => !m)}
                  onDoubleClick={onDoubleTap}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* heart burst on double tap */}
          <AnimatePresence>
            {heartBurst && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div className="text-pink-500" style={{ fontSize: 96 }}>
                  ❤️
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* top: song name */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full border border-white/20 shadow">
            {active?.song || "Original Audio"}
          </div>

          {/* left rail: mute / like / comments / share / upload */}
          <div className="absolute left-3 top-3 bottom-3 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setMuted((m) => !m)}
                className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition shadow"
                title={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX /> : <Volume2 />}
              </button>

              <button
                onClick={() => toggleLike(activeId)}
                className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition shadow group"
                title="Like"
              >
                <Flame className="group-hover:scale-110 transition" />
                <span className="block text-xs mt-1 opacity-90 text-center">{active?.likes ?? 0}</span>
              </button>

              <button
                onClick={() => setShowComments(true)}
                className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition shadow"
                title="Comments"
              >
                <MessageCircle />
                <span className="block text-xs mt-1 opacity-90 text-center">{active?.comments?.length ?? 0}</span>
              </button>

              <button
                onClick={share}
                className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition shadow"
                title="Share"
              >
                <Share2 />
              </button>
            </div>

            <div className="pb-1">
              <button
                onClick={onPick}
                className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition shadow flex items-center gap-2"
                title="Upload reel (<60s)"
              >
                <Upload /><span className="text-xs">Upload</span>
              </button>
              <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={onFile} />
            </div>
          </div>

          {/* right rail: prev / favorite / next (⭐ here, not on video) */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 disabled:opacity-40 shadow transition"
              title="Previous"
            >
              <ChevronUp />
            </button>

            <button
              onClick={() => toggleFav(activeId)}
              className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 transition"
              title="Save to favourites"
            >
              {active?.faved ? <Star className="text-yellow-300" /> : <StarOff />}
            </button>

            <button
              onClick={next}
              disabled={index === reels.length - 1}
              className="p-3 rounded-xl bg-white/15 border border-white/20 text-white hover:bg-white/25 disabled:opacity-40 shadow transition"
              title="Next"
            >
              <ChevronDown />
            </button>
          </div>

          {/* bottom: profile + caption */}
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
            <p className="mt-2 max-w-[70%] text-sm leading-relaxed drop-shadow">
              {active?.caption}
            </p>
          </div>
        </div>
      </div>

      {/* comments drawer */}
      <AnimatePresence>
        {showComments && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowComments(false)}
            />
            <motion.aside
              className="fixed right-0 top-[2.4cm] bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Comments</h3>
                <button onClick={() => setShowComments(false)} className="px-3 py-1 rounded hover:bg-gray-100">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {active?.comments?.length
                  ? active.comments.map((c, i) => (
                      <div key={i} className="bg-gray-50 border rounded-xl px-3 py-2">{c}</div>
                    ))
                  : <p className="text-gray-500">No comments yet.</p>}
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
                        r.id === activeId ? { ...r, comments: [...r.comments, txt] } : r
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
