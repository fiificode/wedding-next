import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";

const REGISTRIES = [
  { title: "[Registry 1]", sub: "e.g. Home & Kitchen" },
  { title: "[Registry 2]", sub: "e.g. Honeymoon Fund" },
  { title: "[Registry 3]", sub: "e.g. Experiences" },
];

export default function RegistryPage() {
  return (
    <section className="chapter">
      <ChapterHero
        eyebrow="WITH GRATITUDE"
        title={
          <>
            The <em>Registry</em>
          </>
        }
        lede="Your presence is the gift — but if you'd like to give more."
      />
      <div className="chapter-body">
        <div className="registry-grid">
          {REGISTRIES.map((r, i) => (
            <Reveal as="div" delay={i * 0.1} className="registry-card" key={r.title}>
              <h5>{r.title}</h5>
              <span>{r.sub}</span>
            </Reveal>
          ))}
        </div>
      </div>
      <PagBar
        prev={{ href: "/details", label: "THE DETAILS" }}
        next={{ href: "/rsvp", label: "RSVP" }}
      />
    </section>
  );
}
