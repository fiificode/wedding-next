import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";
import PhotoUpload from "@/components/PhotoUpload";

export default function GuestGalleryPage() {
  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="GUEST GALLERY"
        title="Share Your Photos"
        back={{ href: "/gallery", label: "GALLERY" }}
        next={{ href: "/trivia", label: "TRIVIA" }}
      />
      <ChapterHero
        eyebrow="FROM YOUR PHONE TO OURS"
        title={
          <>
            Share Your <em>Photos</em>
          </>
        }
        lede="Were you there? Add your photos and videos to our shared album so we can relive the day from every angle."
      />
      <div className="chapter-body">
        <Reveal as="div" delay={0.1} className="share-cta">
          <PhotoUpload />
          <p className="share-cta-note">
            Or tag us <span className="gradient-text">#YOURHASHTAG</span> on social media — we&apos;ll be watching.
          </p>
        </Reveal>
      </div>
      <PagBar
        prev={{ href: "/gallery", label: "GALLERY" }}
        page="05B"
        next={{ href: "/trivia", label: "TRIVIA" }}
      />
    </section>
  );
}
