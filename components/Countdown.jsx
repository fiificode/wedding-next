"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function timeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hrs: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
    done: diff <= 0,
  };
}

/**
 * Live countdown to a target date/time, with each digit rolling in via
 * AnimatePresence when it changes — matches the reference site's ticking
 * "days / hrs / min / sec" counter under each ceremony.
 */
export default function Countdown({ date }) {
  // Runs entirely client-side (this is a "use client" component executed
  // in the visitor's browser at request time, not inside a build script),
  // so reading the current time here is safe.
  const [time, setTime] = useState(null);

  useEffect(() => {
    const target = new Date(date).getTime();
    setTime(timeLeft(target));
    const id = setInterval(() => setTime(timeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [date]);

  const t = time || { days: 0, hrs: 0, mins: 0, secs: 0, done: false };

  if (t.done) {
    return <div className="countdown-done">WE'RE CELEBRATING NOW</div>;
  }

  const cells = [
    ["DAYS", t.days],
    ["HRS", t.hrs],
    ["MIN", t.mins],
    ["SEC", t.secs],
  ];

  return (
    <div className="countdown-cells">
      {cells.map(([label, value]) => (
        <div className="countdown-cell" key={label}>
          <span className="countdown-num">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={value}
                className="countdown-num-inner"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="countdown-cell-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
