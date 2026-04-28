"use client";

import { useEffect, useState } from "react";

const WORDS = ["founder.", "creator.", "designer.", "builder."];
const INTERVAL = 2400;

export function RotatingWords() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setAnimating(false);
      }, 250);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-block text-accent font-mono transition-all duration-300 ${
        animating ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
      }`}
      aria-live="polite"
    >
      {WORDS[index]}
    </span>
  );
}
