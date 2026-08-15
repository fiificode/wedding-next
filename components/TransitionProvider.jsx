"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const TransitionContext = createContext(null);

export function useTransitionNav() {
  return useContext(TransitionContext);
}

/**
 * Click-anchored circular wipe transition (matches the reference site's
 * "iris" page transition instead of a flat fade). Flow:
 *   1. navigate(href, x, y) is called from a TransitionLink click.
 *   2. A dark circle grows from (x, y) until it covers the whole viewport.
 *   3. Once covered, we actually push the Next.js route.
 *   4. When the new route has rendered, the circle shrinks back to a point
 *      at (x, y), revealing the new page underneath.
 */
export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [circle, setCircle] = useState(null); // { x, y, radius, phase }
  const pendingHref = useRef(null);
  const prevPathname = useRef(pathname);

  const start = useCallback(
    (href, x, y) => {
      if (!href || href === pathname) return;
      const maxX = Math.max(x, window.innerWidth - x);
      const maxY = Math.max(y, window.innerHeight - y);
      const radius = Math.ceil(Math.sqrt(maxX * maxX + maxY * maxY)) + 40;
      pendingHref.current = href;
      setCircle({ x, y, radius, phase: "covering" });
    },
    [pathname]
  );

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setCircle((c) => {
        if (c && c.phase === "covered") {
          requestAnimationFrame(() => {
            setCircle((c2) => (c2 ? { ...c2, phase: "revealing" } : c2));
          });
        }
        return c;
      });
      // Scroll to top on every route change, like a fresh magazine page.
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  function handleAnimationComplete() {
    setCircle((c) => {
      if (!c) return c;
      if (c.phase === "covering") {
        if (pendingHref.current) {
          const href = pendingHref.current;
          pendingHref.current = null;
          router.push(href);
        }
        return { ...c, phase: "covered" };
      }
      if (c.phase === "revealing") {
        return null;
      }
      return c;
    });
  }

  return (
    <TransitionContext.Provider value={{ start }}>
      {children}
      {circle && (
        <motion.div
          className="circle-veil"
          initial={{ clipPath: `circle(0px at ${circle.x}px ${circle.y}px)` }}
          animate={{
            clipPath:
              circle.phase === "revealing"
                ? `circle(0px at ${circle.x}px ${circle.y}px)`
                : `circle(${circle.radius}px at ${circle.x}px ${circle.y}px)`,
          }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </TransitionContext.Provider>
  );
}
