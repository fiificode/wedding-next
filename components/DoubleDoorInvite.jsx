"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

/**
 * The RSVP "invitation" — two doors slide apart from the center to reveal
 * a formal invite card underneath. This replaces an earlier version of
 * this template that used a 3D flip; the reference site actually uses a
 * sliding double-door reveal, confirmed by watching it live.
 */
export default function DoubleDoorInvite() {
  const [open, setOpen] = useState(false);

  return (
    <div className="invite-wrap">
      <div
        className="invite-stage"
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
        data-cursor-hover
      >
        <div className="invite-back-card">
          <div className="ib-logo">A &amp; B</div>
          <p className="ib-formal">
            [The families] warmly request the pleasure of your company at the wedding ceremony of
            their children
          </p>
          <div className="ib-names">[Partner One] &amp; [Partner Two]</div>
          <div className="ib-venue">
            <b>[Venue] · 1:00 PM</b>
            [Venue name], [City]
          </div>
          {!open && <div className="ib-tap">TAP TO OPEN</div>}
        </div>

        <motion.div
          className="invite-door invite-door-left"
          animate={{ x: open ? "-100%" : "0%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="door-inner">
            <div className="we-do">we</div>
            <div className="door-names">[Partner One]</div>
          </div>
        </motion.div>

        <motion.div
          className="invite-door invite-door-right"
          animate={{ x: open ? "100%" : "0%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="door-inner">
            <div className="we-do">do</div>
            <div className="door-names">[Partner Two]</div>
          </div>
        </motion.div>
      </div>
      <div className="rsvp-hint">{open ? "TAP TO CLOSE" : "TAP TO OPEN"}</div>
    </div>
  );
}
