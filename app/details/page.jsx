"use client";

import { useRef } from "react";
import Image from "next/image";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ScrollRail from "@/components/ScrollRail";
import Countdown from "@/components/Countdown";
import traditionalWedding from "@/assets/traditionalWedding.jpg";
import whiteWedding from "@/assets/whiteWedding.jpeg";

const EVENTS = [
  {
    tag: "Event 01 — A Celebration of Heritage",
    eyebrow: "CEREMONY ONE",
    title: "The Traditional Ceremony",
    text: "A celebration of heritage, customs, and color — honoring our roots with the families who raised us.",
    inviteOnly: true,
    img: traditionalWedding,
    fields: [
      ["DATE & TIME", "Friday, October 9", "10:00 AM"],
      [
        "VENUE",
        "Presbyterian Church of Ghana",
        "Kaneshie Congregation, Kaneshie, Accra",
      ],
      ["DRESS CODE", "[Traditional attire]", "[Notes on fabric / color]"],
    ],
    ph: "tph-3",
  },
  {
    tag: "Event 02 — A Sacred Union",
    eyebrow: "CEREMONY TWO",
    title: "The White Wedding",
    text: "The formal ceremony and reception — where we say our vows before God and the people we love most.",
    img: whiteWedding,
    fields: [
      ["DATE & TIME", "Saturday, October 10", "1:00 PM"],
      [
        "VENUE",
        "Presbyterian Church of Ghana",
        "Kaneshie Congregation, Kaneshie, Accra",
      ],
      ["DRESS CODE", "[Formal / cocktail attire]", "[Colors to avoid, if any]"],
    ],
    actions: [{ label: "DOWNLOAD PROGRAMME", href: "#", filled: true }],
    ph: "tph-5",
  },
];

export default function DetailsPage() {
  const bodyRef = useRef(null);

  return (
    <section className="chapter">
      <ChapterHero
        eyebrow="WEDDING WEEKEND"
        title={
          <>
            The <em>Celebration</em>
          </>
        }
        lede="Two ceremonies, one beautiful love story — the details for each, in one place."
      />

      <div className="chapter-body countdown-block chapter-spaced">
        <div className="eyebrow">COUNTING DOWN</div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2rem",
            marginTop: 6,
          }}
        >
          Until We Say <em style={{ fontStyle: "italic" }}>I Do</em>
        </h3>
        <div className="countdown-pairs">
          <div className="countdown-panel">
            <div className="eyebrow">CEREMONY ONE</div>
            <h4>Traditional Ceremony</h4>
            <div className="cd-meta">Friday, October 9 · 10:00 AM</div>
            <Countdown date="2026-10-09T10:00:00" />
          </div>
          <div className="countdown-panel">
            <div className="eyebrow">CEREMONY TWO</div>
            <h4>White Wedding</h4>
            <div className="cd-meta">Saturday, October 10 · 1:00 PM</div>
            <Countdown date="2026-10-10T13:00:00" />
          </div>
        </div>
      </div>

      <div
        className="chapter-body"
        ref={bodyRef}
        style={{ position: "relative", marginTop: 60 }}
      >
        <ScrollRail targetRef={bodyRef} />
        <div className="detail-block-list">
          {EVENTS.map((ev, i) => (
            <Reveal
              as="div"
              delay={0}
              className={`detail-block ${i % 2 === 1 ? "reverse" : ""}`}
              key={ev.title}
            >
              <div className="moment-media">
                <div className="moment-frame">
                  <Image
                    src={ev.img}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
                <div className="moment-tag">
                  <span className="tag-rule" />
                  {ev.tag}
                </div>
              </div>
              <div className="detail-block-text">
                <div className="eyebrow" style={{ color: "var(--accent1)" }}>
                  {ev.eyebrow}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.8rem",
                    marginTop: 6,
                  }}
                >
                  {ev.title}
                </h4>
                <p
                  style={{
                    color: "var(--muted)",
                    marginTop: 10,
                    lineHeight: 1.7,
                  }}
                >
                  {ev.text}
                </p>
                {ev.inviteOnly && (
                  <span className="invite-only">
                    Strictly by invitation only
                  </span>
                )}
                <dl>
                  {ev.fields.map(([label, main, sub]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>
                        {main}
                        <small>{sub}</small>
                      </dd>
                    </div>
                  ))}
                </dl>
                {ev.actions && (
                  <div className="detail-actions">
                    {ev.actions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        className={a.filled ? "filled" : ""}
                      >
                        {a.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <PagBar
        prev={{ href: "/gallery", label: "OUR GALLERY" }}
        next={{ href: "/rsvp", label: "RSVP" }}
      />
    </section>
  );
}
