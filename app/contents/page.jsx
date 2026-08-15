import Reveal from "@/components/Reveal";
import TocList from "@/components/TocList";

const CHAPTERS = [
  { num: "01", href: "/story", title: "Our Story", desc: "How it all began" },
  { num: "02", href: "/details", title: "The Details", desc: "Dates, venues, and everything you need to know" },
  { num: "03", href: "/registry", title: "The Registry", desc: "The gift guide" },
  { num: "04", href: "/rsvp", title: "RSVP", desc: "Confirm your attendance" },
  { num: "05", href: "/gallery", title: "Gallery", desc: "An intimate photo album" },
  { num: "06", href: "/trivia", title: "Trivia", desc: "How well do you know the couple?" },
];

export default function ContentsPage() {
  return (
    <section className="contents">
      <div className="dotgrid" />
      <div style={{ position: "relative" }}>
        <Reveal as="div" delay={0} className="contents-head">
          <div className="eyebrow">THE WEDDING ISSUE</div>
          <h2>Contents</h2>
          <p>A celebration in six chapters — swap this copy for your own.</p>
        </Reveal>
        <Reveal as="div" delay={0.08} className="date-badge">
          <div className="d1">SATURDAY</div>
          <div className="d2">October 10</div>
          <div className="d3">2026</div>
        </Reveal>

        <TocList chapters={CHAPTERS} />
      </div>
    </section>
  );
}
