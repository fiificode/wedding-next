"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A thin vertical line with a dot that travels down as you scroll through
 * a chapter's content — mirrors the small scroll-progress marker next to
 * the reference site's "Our Story" timeline.
 */
export default function ScrollRail({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.5;
      const passed = viewportMid - rect.top;
      const p = Math.min(1, Math.max(0, passed / rect.height));
      setProgress(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-dot" style={{ top: `${progress * 100}%` }} />
    </div>
  );
}
