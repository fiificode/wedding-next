"use client";

import { useRef } from "react";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";
import ScrollRail from "@/components/ScrollRail";
import Countdown from "@/components/Countdown";

const EVENTS = [
  {
    tag: "Event 01 — A Celebration of Heritage",
    eyebrow: "CEREMONY ONE",
    title: "The Traditional Ceremony",
    text: "Join us as we honor our roots with a beautiful traditional wedding ceremony — customs, colors, and joyful celebration.",
    inviteOnly: true,
    fields: [
      ["DATE & TIME", "[Day], [Date]", "[Time]"],
      ["VENUE", "[Venue name]", "[City / region]"],
      ["DRESS CODE", "[Traditional attire]", "[Notes on fabric / color]"],
    ],
    ph: "tph-3",
  },
  {
    tag: "Event 02 — A Sacred Union",
    eyebrow: "CEREMONY TWO",
    title: "The White Wedding",
    text: "The formal ceremony, followed by a reception — all details your guests need to plan around.",
    fields: [
      ["DATE & TIME", "[Day], [Date]", "[Time]"],
      ["VENUE", "[Church / venue name]", "[Address, city]"],
      ["DRESS CODE", "[Formal / cocktail attire]", "[Colors to avoid, if any]"],
    ],
    actions: [
      { label: "WATCH ON YOUTUBE", href: "#", filled: true },
      { label: "DOWNLOAD PROGRAMME", href: "#" },
    ],
    ph: "tph-5",
  },
];

export default function DetailsPage() {
  const bodyRef = useRef(null);

  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 02"
        title="Details"
        back={{ href: "/story", label: "OUR STORY" }}
        next={{ href: "/registry", label: "REGISTRY" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 02"
        title={
          <>
            The <em>Celebration</em>
          </>
        }
        lede="Two ceremonies, one beautiful love story — replace with your own event names."
      />

      <div className="chapter-body countdown-block">
        <div className="eyebrow">COUNTING DOWN</div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginTop: 6 }}>
          Until We Say <em style={{ fontStyle: "italic" }}>I Do</em>
        </h3>
        <div className="countdown-pairs">
          <div className="countdown-panel">
            <div className="eyebrow">CEREMONY ONE</div>
            <h4>Traditional Ceremony</h4>
            <div className="cd-meta">[Day], [Date] · [Time]</div>
            <Countdown date="2026-12-01T09:00:00" />
          </div>
          <div className="countdown-panel">
            <div className="eyebrow">CEREMONY TWO</div>
            <h4>White Wedding</h4>
            <div className="cd-meta">[Day], [Date] · [Time]</div>
            <Countdown date="2026-12-03T12:00:00" />
          </div>
        </div>
      </div>

      <div className="chapter-body" ref={bodyRef} style={{ position: "relative", marginTop: 60 }}>
        <ScrollRail targetRef={bodyRef} />
        <div className="detail-block-list">
          {EVENTS.map((ev, i) => (
            <Reveal as="div" delay={0} className={`detail-block ${i % 2 === 1 ? "reverse" : ""}`} key={ev.title}>
              <div className="moment-media">
                <div className={`media-ph ${ev.ph}`}>Replace with photo</div>
                <div className="moment-tag">
                  <span className="tag-rule" />
                  {ev.tag}
                </div>
              </div>
              <div className="detail-block-text">
                <div className="eyebrow" style={{ color: "var(--accent1)" }}>
                  {ev.eyebrow}
                </div>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginTop: 6 }}>
                  {ev.title}
                </h4>
                <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.7 }}>{ev.text}</p>
                {ev.inviteOnly && <span className="invite-only">Strictly by invitation only</span>}
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
                      <a key={a.label} href={a.href} className={a.filled ? "filled" : ""}>
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
        prev={{ href: "/story", label: "OUR STORY" }}
        page="02"
        next={{ href: "/registry", label: "THE REGISTRY" }}
      />
    </section>
  );
}
