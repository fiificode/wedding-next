"use client";

import { useEffect, useState } from "react";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";
import TransitionLink from "@/components/TransitionLink";
import PhotoUpload from "@/components/PhotoUpload";

const ACCESS_CODE = "OURDAY";

const PERKS = [
  "Snap photos or choose from your library",
  "Up to 10 photos per guest",
  "Browse the shared gallery with photos from all guests",
];

export default function GuestGalleryPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [sharedPhotos, setSharedPhotos] = useState([]);
  const [loadingShared, setLoadingShared] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (code.trim().toUpperCase() !== ACCESS_CODE) {
      setError("That code doesn't match — check the card at the venue.");
      return;
    }
    setError("");
    setUnlocked(true);
  }

  useEffect(() => {
    if (!unlocked) return;
    let cancelled = false;
    setLoadingShared(true);
    fetch("/api/guest-uploads")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSharedPhotos(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoadingShared(false);
      });
    return () => {
      cancelled = true;
    };
  }, [unlocked]);

  function handleUploaded(entry) {
    setSharedPhotos((prev) => [entry, ...prev]);
  }

  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="GUEST GALLERY"
        title="Share Your Moments"
        back={{ href: "/gallery", label: "OUR GALLERY" }}
        next={{ href: "/trivia", label: "TRIVIA" }}
      />
      <ChapterHero
        eyebrow="GUEST GALLERY"
        title="Share Your Moments"
        lede="Help us capture every moment of this special day"
      />
      <div className="chapter-body">
        {!unlocked ? (
          <div className="guest-gate">
            <Reveal as="p" delay={0.1} className="guest-gate-copy">
              Take photos during the ceremonies and the cocktails afterwards, then upload them
              here to our shared guest gallery. Your photos will join everyone else&apos;s to
              create a beautiful, collective memory of the celebration.
            </Reveal>

            <Reveal as="ul" delay={0.16} className="guest-perks">
              {PERKS.map((perk) => (
                <li key={perk}>
                  <span className="perk-spark">✦</span>
                  {perk}
                </li>
              ))}
            </Reveal>

            <Reveal as="p" delay={0.22} className="guest-gate-hint">
              Enter the access code displayed at the venue to get started
            </Reveal>

            <Reveal as="form" delay={0.28} className="guest-gate-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="guest-input"
              />
              <input
                type="text"
                placeholder="ACCESS CODE"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError("");
                }}
                className="guest-input guest-input-code"
              />
              {error && <div className="guest-gate-error">{error}</div>}
              <button type="submit" className="guest-enter-btn">
                ENTER GALLERY
              </button>
            </Reveal>

            <Reveal as="div" delay={0.34} className="guest-back">
              <TransitionLink href="/gallery" className="guest-back-link">
                ← BACK TO OUR GALLERY
              </TransitionLink>
            </Reveal>
          </div>
        ) : (
          <>
            <div className="guest-gate">
              <Reveal as="p" delay={0} className="guest-welcome">
                Welcome{name.trim() ? `, ${name.trim()}` : ""} — thanks for being here.
              </Reveal>
              <Reveal as="div" delay={0.08} className="share-cta">
                <PhotoUpload guestName={name} onUploaded={handleUploaded} />
              </Reveal>
            </div>

            <Reveal as="div" delay={0.14} className="guest-shared">
              <p className="guest-shared-title">
                From the gallery{sharedPhotos.length > 0 ? ` (${sharedPhotos.length})` : ""}
              </p>
              {!loadingShared && sharedPhotos.length === 0 && (
                <p className="guest-shared-empty">No photos yet — be the first to share one.</p>
              )}
              <div className="guest-shared-grid">
                {sharedPhotos.map((p) => (
                  <div className="guest-shared-item" key={p.id}>
                    {p.isVideo ? (
                      <video src={p.src} muted controls />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.src} alt="" />
                    )}
                    <span className="photo-upload-credit">{p.uploadedBy}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </>
        )}
      </div>
      <PagBar
        prev={{ href: "/gallery", label: "OUR GALLERY" }}
        page="GUEST"
        next={{ href: "/trivia", label: "TRIVIA" }}
      />
    </section>
  );
}
