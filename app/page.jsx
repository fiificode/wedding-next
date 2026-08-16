import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Reveal from "@/components/Reveal";
import couple from "@/assets/couple.jpg";

export default function CoverPage() {
  return (
    <section className="cover">
      <aside className="cover-sidebar">
        <Reveal as="div" delay={0.1} className="cover-sidebar-text">
          October 10 · 2026
        </Reveal>
      </aside>

      <div className="cover-hero">
        <Image
          src={couple}
          alt=""
          fill
          priority
          className="cover-bg"
          sizes="100vw"
        />
        <div className="cover-overlay" />

        <Reveal as="div" delay={0.15} className="cover-meta-top">
          Accra, Ghana
        </Reveal>

        <div className="cover-names">
          <Reveal as="h1" delay={0.2}>
            <em>Akoi</em>
          </Reveal>
          <Reveal as="h1" delay={0.26}>
            <span className="and">&amp;</span>{" "}
            <span className="partner2">Afua</span>
          </Reveal>
          <Reveal as="div" delay={0.32} className="cover-hashtag gradient-text">
            #AkoiAfua2026
          </Reveal>
          <Reveal as="div" delay={0.38} className="cover-line">
            A celebration of{" "}
            <span className="accent">love</span> &amp;{" "}
            <span className="pink">forever</span>.
          </Reveal>
          <Reveal
            as={TransitionLink}
            delay={0.46}
            href="/story"
            className="open-issue"
          >
            Enter Our Wedding
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
