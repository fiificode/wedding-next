"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { useTransitionNav } from "@/components/TransitionProvider";

/**
 * Drop-in replacement for next/link's <Link> that triggers the
 * click-anchored circle-wipe transition (see TransitionProvider) instead
 * of navigating immediately.
 */
const TransitionLink = forwardRef(function TransitionLink(
  { href, onClick, children, ...rest },
  ref
) {
  const ctx = useTransitionNav();

  function handleClick(e) {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    ctx?.start(href, e.clientX, e.clientY);
  }

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});

export default TransitionLink;
