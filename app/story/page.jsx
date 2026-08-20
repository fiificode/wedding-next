"use client";

import { useRef } from "react";
import Image from "next/image";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ScrollRail from "@/components/ScrollRail";
import couple from "@/assets/couple.jpg";
import traditionalWedding from "@/assets/traditionalWedding.jpg";
import friendsStory from "@/assets/friendsStory.jpg";
import proposalStory from "@/assets/proposalStory.jpg";
import firstMessages from "@/assets/firstMessages.png";

const MOMENTS = [
  {
    year: "2020",
    tag: "The Beginning",
    eyebrow: "IN AFUA'S WORDS",
    title: "How We Met",
    text: "It was 21st May 2020, right in the middle of the COVID-19 lockdown, when I saw this very handsome gentleman on a friend's WhatsApp status — and it happened to be his birthday. I asked for his number, sent him a birthday message, and before the night was over we'd had our very first phone call. It didn't feel like talking to a stranger at all — the conversation flowed like we'd known each other for years.",
    callout: "Some meetings feel written in advance.",
    img: firstMessages,
  },
  {
    year: "2020",
    tag: "First Meeting",
    eyebrow: "TWO CITIES, ONE VISIT",
    title: "Meeting in Person",
    text: "We lived in different cities, so it took a little while to meet face to face. On 2nd July 2020, Nana Kofi came to Accra for a funeral and visited me at home — that day and the next gave us our very first real memories together.",
    img: couple,
  },
  {
    year: "2021",
    tag: "Finding Our Way Back",
    eyebrow: "THE RECONNECTION",
    title: "Losing Touch, Finding Our Way Back",
    text: "Life got in the way and we lost touch for a while. But our story wasn't finished — in March 2021, almost a year later, Nana Kofi came back to Accra, and somehow we found our way back to each other, reconnecting as friends as though we'd never lost touch at all.",
    img: friendsStory,
  },
  {
    year: "2021",
    tag: "Forever Begins",
    eyebrow: "THE QUESTION",
    title: "Yes, I'll Be Your Girlfriend",
    text: "On 4th July 2021, I accompanied him to the one-year anniversary of the very funeral that first brought him to Accra. The next day, 5th July 2021, Nana Kofi asked me to be his girlfriend — and just like that, a friendship that started with a WhatsApp status turned into a beautiful love story.",
    callout: "One text can change your whole life.",
    img: traditionalWedding,
  },
  {
    year: "2025",
    tag: "Forever",
    eyebrow: "THE QUESTION",
    title: "The Proposal",
    text: "With family in our hearts and a future in mind, Akoi asked the question that would change everything. Afua said yes — and October 10, 2026 became the date we've been counting down to ever since.",
    callout: "She said yes — and forever began.",
    img: proposalStory,
  },
];

export default function StoryPage() {
  const bodyRef = useRef(null);

  return (
    <section className="chapter">
      <ChapterHero
        eyebrow="HOW IT ALL BEGAN"
        title={
          <>
            Our <em>Story</em>
          </>
        }
        lede="Two lives in Accra, one love story. Ours began with a hello and continues on October 10, 2026."
        meta="ACCRA, GHANA"
      />
      <div
        className="chapter-body"
        ref={bodyRef}
        style={{ position: "relative" }}
      >
        <ScrollRail targetRef={bodyRef} />
        <div className="moments">
          {MOMENTS.map((m, i) => (
            <Reveal
              as="div"
              delay={0}
              className={`moment ${i % 2 === 1 ? "reverse" : ""}`}
              key={m.title}
            >
              <div className="moment-media">
                {m.img ? (
                  <div className="moment-frame">
                    <Image
                      src={m.img}
                      alt={m.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  </div>
                ) : (
                  <div className={`media-ph ${m.ph}`}>Photo coming soon</div>
                )}
                <div className="moment-tag">
                  <span className="tag-rule" />
                  {m.tag}
                </div>
              </div>
              <div className="moment-text">
                <div className="moment-year">{m.year}</div>
                <div className="eyebrow moment-eyebrow">{m.eyebrow}</div>
                <h4>{m.title}</h4>
                <hr className="moment-rule" />
                <p>{m.text}</p>
                {m.callout && (
                  <span className="moment-callout">{m.callout}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <PagBar
        prev={{ href: "/", label: "COVER" }}
        next={{ href: "/gallery", label: "OUR GALLERY" }}
      />
    </section>
  );
}
