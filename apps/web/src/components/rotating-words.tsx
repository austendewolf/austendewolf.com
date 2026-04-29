"use client";

import { useEffect, useState } from "react";

const WORDS: { word: string; note: string }[] = [
  { word: "software", note: "mostly" },
  { word: "companies", note: "occasionally" },
  { word: "teams", note: "currently" },
  { word: "trucks", note: "one" },
  { word: "furniture", note: "lately" },
  { word: "food", note: "apparently" },
];
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

  const { word, note } = WORDS[index];

  return (
    <span
      className={`inline-block font-mono transition-all duration-300 ${
        animating ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
      }`}
      aria-live="polite"
    >
      <span className="text-accent">{word}</span>
      <span className="ml-2 text-sm text-muted-foreground">({note})</span>
    </span>
  );
}
