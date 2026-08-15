"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Shown once per app session (state lives in this client component, which
 * mounts once at the root layout and persists across client-side route
 * changes) — matches the reference site only showing its loader on a hard
 * page load, not on every "Open Issue" style navigation.
 */
export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            A &amp; B
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
