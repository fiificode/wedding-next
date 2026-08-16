"use client";

import { useEffect, useState } from "react";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";
import GuestbookForm from "@/components/GuestbookForm";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handlePosted(entry) {
    setEntries((prev) => [entry, ...prev]);
  }

  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 06"
        title="Guestbook"
        back={{ href: "/guest-gallery", label: "GUEST GALLERY" }}
        next={{ href: "/vendors", label: "VENDORS" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 06"
        title={
          <>
            Sign Our <em>Guestbook</em>
          </>
        }
        lede="Words of love, laughter, and well wishes from those who matter most."
        dark
      />
      <div className="chapter-body chapter-spaced">
        <Reveal as="div" delay={0.1} className="guestbook-cta-wrap">
          <GuestbookForm onPosted={handlePosted} />
        </Reveal>

        {!loading && entries.length === 0 && (
          <p className="guestbook-empty">
            No messages yet — be the first to sign the book.
          </p>
        )}

        <div className="guestbook-grid">
          {entries.map((entry, i) => (
            <Reveal
              as="div"
              delay={(i % 6) * 0.05}
              className="guestbook-card"
              key={entry.id}
            >
              <span className="quote-mark">&ldquo;</span>
              <p className="gb-message">{entry.message}</p>
              <div className="gb-name">{entry.name}</div>
              <div className="gb-date">{formatDate(entry.createdAt)}</div>
            </Reveal>
          ))}
        </div>
      </div>
      <PagBar
        prev={{ href: "/guest-gallery", label: "GUEST GALLERY" }}
        page="06"
        next={{ href: "/vendors", label: "FOR OUR VENDORS" }}
      />
    </section>
  );
}
