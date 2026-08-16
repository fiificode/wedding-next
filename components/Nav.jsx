"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

const LINKS = [
  { href: "/", label: "Cover" },
  { href: "/contents", label: "Contents" },
  { href: "/story", label: "Our Story", chapter: "Chapter 01" },
  { href: "/gallery", label: "Our Gallery", chapter: "Chapter 02" },
  { href: "/details", label: "The Details", chapter: "Chapter 03" },
  { href: "/rsvp", label: "RSVP", chapter: "Chapter 04" },
  { href: "/guest-gallery", label: "Guest Gallery" },
  { href: "/guestbook", label: "Guestbook", chapter: "Chapter 05" },
  { href: "/vendors", label: "For Our Vendors" },
  // { href: "/trivia", label: "Trivia", chapter: "Chapter 05" },
  // { href: "/registry", label: "The Registry", chapter: "Chapter 03" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 380);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // White hamburger over the dark cover + dark hero sections; dark once
  // scrolled into light content (except pages that are dark throughout).
  const light =
    pathname === "/" ||
    pathname === "/rsvp" ||
    (pathname !== "/contents" && !scrolled);

  return (
    <>
      <nav className="topnav">
        <button
          className={`hamburger ${light ? "light" : ""}`}
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
            {link.chapter && <small>{link.chapter}</small>}
          </TransitionLink>
        ))}
      </div>
    </>
  );
}
