"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small ring that trails the mouse with easing and grows over
 * clickable elements — mirrors the reference site's custom cursor.
 * Disabled entirely on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    function onMove(e) {
      target.current = { x: e.clientX, y: e.clientY };
    }
    function onOver(e) {
      const el = e.target.closest && e.target.closest("a, button, [data-cursor-hover]");
      setHovering(!!el);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    let raf;
    function loop() {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return <div ref={dotRef} className={`custom-cursor ${hovering ? "hovering" : ""}`} />;
}
