"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

const LINKS = [
  { href: "/", label: "Cover" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Our Gallery" },
  { href: "/details", label: "The Details" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/guest-gallery", label: "Guest Gallery" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/vendors", label: "For Our Vendors" },
];

const DESKTOP_LINKS = LINKS.filter((l) => l.href !== "/");

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const light = pathname === "/";

  return (
    <>
      <nav className={`site-nav ${light ? "light" : ""}`}>
        <TransitionLink href="/" className="site-nav-brand">
          A&nbsp;&amp;&nbsp;A
        </TransitionLink>
        <div className="site-nav-links">
          {DESKTOP_LINKS.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.label}
            </TransitionLink>
          ))}
        </div>
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`navmask ${open ? "open" : ""}`}>
        <button
          className="close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        {LINKS.map((link) => (
          <TransitionLink
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </TransitionLink>
        ))}
      </div>
    </>
  );
}
