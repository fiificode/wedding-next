"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides an element in once it scrolls into view — mirrors the
 * staggered "chapter" reveal on the original site (used for TOC rows,
 * chapter hero text, timeline entries, cards, and gallery tiles).
 *
 * Usage: <Reveal delay={0.1}><h2>Our Story</h2></Reveal>
 * `as` lets you pick the wrapper tag (defaults to div).
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If it's already on screen when it mounts (e.g. above the fold on
    // page load), reveal immediately instead of waiting on the observer.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
