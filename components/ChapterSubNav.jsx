"use client";

import { useEffect, useState } from "react";
import TransitionLink from "@/components/TransitionLink";

/**
 * Sticky bar that slides in once you scroll past a chapter's hero —
 * mirrors the reference site's "← Contents · Chapter 0X · Title · Next →"
 * bar that appears while reading a chapter.
 */
export default function ChapterSubNav({ chapterLabel, title, back, next }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 380);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`chapter-subnav ${show ? "show" : ""}`}>
      <TransitionLink href={back.href} className="subnav-side">
        <span className="subnav-brand">A&amp;A</span>
        <span className="subnav-sep">·</span>
        {back.label}
      </TransitionLink>
      <div className="subnav-center">
        <span>{chapterLabel}</span>
        <span className="subnav-sep">|</span>
        <em>{title}</em>
      </div>
      <TransitionLink href={next.href} className="subnav-side right">
        {next.label} →
      </TransitionLink>
    </div>
  );
}
