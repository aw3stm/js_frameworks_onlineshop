"use client";

import { useEffect, useState } from "react";

const messages = [
  "Free delivery on orders over 500 SEK",
  "30-day free returns",
  "New winter collection out now",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearTimeout(t);
  }, [index, paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="bg-atelier-details text-white text-[10px] sm:text-xs text-center py-2 md:py-3 tracking-[0.2em] uppercase overflow-hidden"
    >
      <p key={index} className="motion-safe:animate-slide-in">
        {messages[index]}
      </p>
    </div>
  );
}
