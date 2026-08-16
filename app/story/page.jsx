"use client";

import { useRef } from "react";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";
import ScrollRail from "@/components/ScrollRail";

const MOMENTS = [
  {
    year: "[YEAR]",
    tag: "Chapter 01 · The Beginning",
    eyebrow: "IN [PARTNER ONE]'S WORDS",
    title: "How We Met",
    text: "Placeholder — describe the moment you met. One or two sentences is plenty; let the photos on the Gallery chapter do the rest.",
    callout: "[A one-line quote or callout about this moment]",
    ph: "tph-1",
  },
  {
    year: "[YEAR]",
    tag: "Chapter 01 · The Same Day",
    eyebrow: "THE GROWING BOND",
    title: "From Strangers to Friends",
    text: "Placeholder — how did the friendship develop? What turned casual encounters into something more?",
    ph: "tph-2",
  },
  {
    year: "[YEAR]",
    tag: "Chapter 02 · Falling",
    eyebrow: "IN [PARTNER TWO]'S WORDS",
    title: "The First Date",
    text: "Placeholder — where did you go, what did you talk about, what made you know?",
    ph: "tph-3",
  },
  {
    year: "[YEAR]",
    tag: "Chapter 03 · Forever",
    eyebrow: "THE QUESTION",
    title: "The Proposal",
    text: "Placeholder — this is usually the emotional high point of the chapter. Take your time with it.",
    callout: "[Where / how it happened, in one line]",
    ph: "tph-4",
  },
];

export default function StoryPage() {
  const bodyRef = useRef(null);

  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 01"
        title="Our Story"
        back={{ href: "/contents", label: "CONTENTS" }}
        next={{ href: "/details", label: "DETAILS" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 01"
        title={
          <>
            Our <em>Story</em>
          </>
        }
        lede="Replace this with the line that captures how you met — keep it short and a little cinematic."
        meta="[MEETING DATE] · [PLACE YOU MET]"
        dark
      />
      <div className="chapter-body" ref={bodyRef} style={{ position: "relative" }}>
        <ScrollRail targetRef={bodyRef} />
        <div className="moments">
          {MOMENTS.map((m, i) => (
            <Reveal as="div" delay={0} className={`moment ${i % 2 === 1 ? "reverse" : ""}`} key={m.title}>
              <div className="moment-media">
                <div className={`media-ph ${m.ph}`}>Replace with photo</div>
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
                {m.callout && <span className="moment-callout">{m.callout}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <PagBar
        prev={{ href: "/contents", label: "CONTENTS" }}
        page="01"
        next={{ href: "/details", label: "THE DETAILS" }}
      />
    </section>
  );
}
