import Image from "next/image";
import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";

import galleryWhereBegan from "@/assets/galleryWhereBegan.jpg";
import friendsStory from "@/assets/friendsStory.jpg";
import proposalStory from "@/assets/proposalStory.jpg";
import galleryEngagement from "@/assets/galleryEngagement.jpg";
import galleryFamily from "@/assets/galleryFamily.jpg";
import traditionalWedding from "@/assets/traditionalWedding.jpg";

const PHOTOS = [
  {
    img: galleryWhereBegan,
    caption: "Where it all began",
    sub: "From the very first hello",
  },
  {
    img: friendsStory,
    caption: "From friends to forever",
    sub: "Chapter by chapter",
  },
  {
    img: proposalStory,
    caption: "The proposal",
    sub: "The question that changed everything",
  },
  {
    img: galleryEngagement,
    caption: "Engagement shoot",
    sub: "One day closer to forever",
  },
  {
    img: galleryFamily,
    caption: "Family celebrations",
    sub: "Surrounded by love",
  },
  {
    img: traditionalWedding,
    caption: "Getting ready",
    sub: "The calm before the aisle",
  },
];

export default function GalleryPage() {
  return (
    <section className="chapter">
      <ChapterHero
        eyebrow="MOMENTS WE TREASURE"
        title={
          <>
            Our <em>Gallery</em>
          </>
        }
        lede="Moments captured in time — a peek into the story so far, with plenty more to come."
      />
      <div className="chapter-body">
        <div className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <Reveal
              as="div"
              delay={(i % 3) * 0.08}
              className="gallery-item"
              key={p.caption}
            >
              <div className="gallery-tile" style={{ position: "relative" }}>
                {p.img ? (
                  <Image
                    src={p.img}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                    priority={i < 3}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className={`tile-ph ${p.ph}`}>
                    Photo {String(i + 1).padStart(2, "0")}
                  </div>
                )}
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

        <Reveal as="div" delay={0.1} className="share-cta">
          <hr className="rule center" />
          <p className="share-cta-question">Were you at the wedding?</p>
          <TransitionLink href="/guest-gallery" className="filled-btn">
            SHARE YOUR PHOTOS
          </TransitionLink>
        </Reveal>
      </div>
      <PagBar
        prev={{ href: "/story", label: "OUR STORY" }}
        next={{ href: "/details", label: "THE DETAILS" }}
      />
    </section>
  );
}
