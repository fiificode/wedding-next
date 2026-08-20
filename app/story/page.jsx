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
    text: "It all began in 2020, right in the middle of the COVID-19 lockdown. I happened to see this very handsome gentleman on a Julia’s WhatsApp status. It was 21st May, and as fate would have it, it was also his birthday and honestly, from the moment I saw him, I just knew he was going to be my husband. 🤪😗😂.I told Julia I liked him and wanted to be his friend, so she gave me his number. Later that evening, I sent him a birthday message, introduced myself, and told him how I got his number. One conversation led to another, and before we knew it, we had our first phone call that same night.The funny thing was, it didn’t feel like I was talking to a stranger. Somehow, the conversation flowed naturally, almost as though we had known each other for years. ❤️",
    callout: "Some meetings feel written in advance.",
    img: firstMessages,
  },
  {
    year: "2020",
    tag: "First Meeting",
    eyebrow: "TWO CITIES, ONE VISIT",
    title: "Meeting in Person",
    text: "At the time, we lived in different cities, so meeting in person took a little while. We finally met for the first time on 2nd July 2020, when Nana Kofi came to Accra for a funeral and visited me at my house on that day and the next day , and those two days gave us our first real memories together.Then, as life sometimes does, things took an unexpected turn. We lost touch and stopped talking for a while. But apparently, our story wasn’t finished yet. 😂",
    img: couple,
  },
  {
    year: "2021",
    tag: "Finding Our Way Back",
    eyebrow: "THE RECONNECTION",
    title: "Losing Touch, Finding Our Way Back",
    text: "In March 2021, almost a year later, Nana Kofi came back to Accra, and somehow, we found our way back to each other. We reconnected as friends and continued talking as though we had never lost touch in the first place. On 4th July 2021, I accompanied him to the one-year anniversary of the same funeral he had attended the year before. Little did I know that this  would become another important chapter in our story, because the very next day, 5th July 2021, Nana Kofi asked me to be his girlfriend. 🥹❤️. And just like that, the friendship that started with a WhatsApp status turned into a beautiful love story.",
    img: friendsStory,
  },
  {
    year: "2026",
    tag: "Forever Begins",
    eyebrow: "THE QUESTION",
    title: "Yes, I'll Be Your Girlfriend",
    text: "Five years later, we look back at that unexpected beginning and realise that what seemed like a simple birthday message was actually the start of something much bigger. Through the distance, the lost contact, the reconnection, and every moment in between, God had been writing our story in His own beautiful way. And now, five years later, here we are, not just celebrating how we met, but celebrating the love, friendship, memories, and journey that brought us here. And the best part?. This is only the beginning. ❤️🥹",
    callout: "One text can change your whole life.",
    img: traditionalWedding,
  },
  {
    year: "2026",
    tag: "Forever",
    eyebrow: "FOREVER",
    title: "The Lesson",
    text: "Moral of the story: Please, share your friends’ contacts generously! 😂 You never know whose future husband or wife you might be helping someone find 🤣. And to my ladies, don’t always wait for the guy to text first! 😂 It’s perfectly okay to shoot your shot first. Sometimes, that one text can change your whole life. 😜❤️",
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
