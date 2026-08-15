import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";

const PHOTOS = [
  { ph: "tph-1", caption: "Where it all began", sub: "[Location] · [Year]" },
  { ph: "tph-2", caption: "From friends to forever", sub: "[Location] · [Year]" },
  { ph: "tph-3", caption: "The proposal", sub: "[Location] · [Year]" },
  { ph: "tph-4", caption: "Engagement shoot", sub: "[Location] · [Year]" },
  { ph: "tph-5", caption: "Family celebrations", sub: "[Location] · [Year]" },
  { ph: "tph-6", caption: "Getting ready", sub: "[Location] · [Year]" },
];

export default function GalleryPage() {
  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 05"
        title="Gallery"
        back={{ href: "/rsvp", label: "RSVP" }}
        next={{ href: "/trivia", label: "TRIVIA" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 05"
        title={
          <>
            The <em>Gallery</em>
          </>
        }
        lede="Moments captured in time — replace these placeholder tiles with your own photos."
      />
      <div className="chapter-body">
        <div className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <Reveal as="div" delay={(i % 3) * 0.08} className="gallery-item" key={p.caption}>
              <div className="gallery-tile">
                <div className={`tile-ph ${p.ph}`}>Photo {String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="gallery-caption">
                <span className="cap-rule" />
                <div>
                  {p.caption}
                  <span className="cap-sub">{p.sub}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <PagBar
        prev={{ href: "/rsvp", label: "RSVP" }}
        page="05"
        next={{ href: "/trivia", label: "TRIVIA" }}
      />
    </section>
  );
}
