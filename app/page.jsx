import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import couple from "@/assets/couple.jpg";

export default function CoverPage() {
  return (
    <section className="cover">
      <Image src={couple} alt="" fill priority className="cover-bg" sizes="100vw" />
      <div className="cover-overlay" />
      <Reveal as="div" delay={0.1} className="cover-meta-top">
        Summer 2026
        <br />
        Issue No. 1
        <br />
        [Your City]
      </Reveal>
      <Reveal as="div" delay={0.15} className="cover-meta-inside">
        <div className="k">INSIDE</div>
        <div className="story-title">Our Love Story</div>
        <div style={{ fontSize: ".8rem", opacity: 0.75 }}>How it all began, in your own words</div>
        <div className="k" style={{ marginTop: 14 }}>PLUS</div>
        <div className="story-title">An Intimate Gallery</div>
      </Reveal>

      <Reveal as="div" delay={0} className="masthead">
        <div className="logo">A &amp; B</div>
        <div className="tag">THE WEDDING ISSUE</div>
        <div className="hashtag gradient-text">#YOURHASHTAG</div>
      </Reveal>

      <div className="cover-names">
        <Reveal as="h1" delay={0.2}>
          <em>[Partner One]</em>
        </Reveal>
        <Reveal as="h1" delay={0.26}>
          <span className="and">&amp;</span> <span className="partner2">[Partner Two]</span>
        </Reveal>
        <Reveal as="div" delay={0.32} className="cover-sub">
          [WEDDING DATE]
        </Reveal>
        <Reveal as="div" delay={0.38} className="cover-line">
          A celebration of
          <br />
          <span className="accent">love</span> &amp; <span className="pink">forever</span>
        </Reveal>
        <Reveal as={TransitionLink} delay={0.46} href="/contents" className="open-issue">
          OPEN ISSUE
        </Reveal>
      </div>

      <Reveal as="div" delay={0.5} className="cover-footer">
        <div className="links">
          <TransitionLink href="/story">The Love Story</TransitionLink>·
          <TransitionLink href="/gallery">Photo Gallery</TransitionLink>·
          <TransitionLink href="/details">Wedding Details</TransitionLink>·
          <TransitionLink href="/rsvp">RSVP</TransitionLink>·
          <TransitionLink href="/trivia">Trivia</TransitionLink>
        </div>
        <div>COVER</div>
      </Reveal>
    </section>
  );
}
