"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";

/**
 * Contents table-of-contents list. Hovering a row shifts its title to the
 * accent color, reveals a photo thumbnail, fades in the arrow, and — via
 * Framer Motion's `layout` prop — smoothly pushes the rows below down to
 * make room, instead of just snapping. Mirrors the reference site.
 */
export default function TocList({ chapters }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="toc-list">
      {chapters.map((c, i) => (
        // Outer Reveal handles the on-scroll fade-up entrance via plain CSS
        // transitions; the inner motion.div (below) independently owns the
        // Framer Motion `layout` animation for the hover push-down, so the
        // two animation systems never fight over the same `transform`.
        <Reveal as="div" key={c.href} delay={0.16 + i * 0.06}>
          <motion.div layout transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}>
            <TransitionLink
              href={c.href}
              className="toc-item"
              onMouseEnter={() => setHovered(c.href)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="num">{c.num}</div>
              <div>
                <h3 className={hovered === c.href ? "hovered" : ""}>{c.title}</h3>
                <p>{c.desc}</p>
                <motion.div
                  className="toc-thumb"
                  initial={false}
                  animate={
                    hovered === c.href
                      ? { height: 90, opacity: 1, marginTop: 12 }
                      : { height: 0, opacity: 0, marginTop: 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`toc-thumb-ph tph-${(i % 6) + 1}`} />
                </motion.div>
              </div>
              <div className={`arrow ${hovered === c.href ? "show" : ""}`}>→</div>
            </TransitionLink>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}
