import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import data from "../data/businesses.json";

export default function Chat() {
  const { id } = useParams();
  const shop = data.find(s => Number(s.id) === Number(id));
  const [msgs, setMsgs] = useState([
    { from: "shop", text: `Hi! This is ${shop?.name || "Shop"}. How can we help?`, time: Date.now() }
  ]);
  const [text, setText] = useState("");

  useEffect(() => {
    // scroll handling or other effects can go here
  }, []);

  const send = () => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { from: "user", text: text.trim(), time: Date.now() }]);
    setText("");
    // fake shop reply
    setTimeout(() => setMsgs(m => [...m, { from: "shop", text: "Thanks! We'll respond soon.", time: Date.now() }]), 700);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] pt-[2.4cm]">
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={shop?.image || "/assets/placeholder.png"} alt={shop?.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-semibold">{shop?.name}</div>
              <div className="text-sm text-gray-500">{shop?.category}</div>
            </div>
          </div>

          <div className="h-[60vh] overflow-y-auto p-2 space-y-3 bg-gray-50 rounded-lg mb-4">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[80%] ${m.from === "user" ? "ml-auto text-right" : ""}`}>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`inline-block px-4 py-2 rounded-lg ${m.from === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-800 shadow-sm"}`}>
                  {m.text}
                </motion.div>
                <div className="text-xs text-gray-400 mt-1">{new Date(m.time).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type a message..." className="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-300" />
            <button onClick={send} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
