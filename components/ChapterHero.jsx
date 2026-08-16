import Reveal from "@/components/Reveal";

export default function ChapterHero({ eyebrow, title, lede, meta, dark }) {
  return (
    <div className={`chapter-hero ${dark ? "hero-dark" : ""}`}>
      <div className={`dotgrid ${dark ? "on-dark" : ""}`} />
      {dark && <div className="glow" />}
      <div style={{ position: "relative" }}>
        <Reveal as="div" delay={0} className="eyebrow accent">
          {eyebrow}
        </Reveal>
        <Reveal as="h2" delay={0.08}>
          {title}
        </Reveal>
        <Reveal as="hr" delay={0.16} className="rule center" />
        {lede && (
          <Reveal as="p" delay={0.24} className="lede">
            {lede}
          </Reveal>
        )}
        {meta && (
          <Reveal as="div" delay={0.32} className="meta">
            {meta}
          </Reveal>
        )}
      </div>
    </div>
  );
}
