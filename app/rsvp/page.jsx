import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import ChapterSubNav from "@/components/ChapterSubNav";
import DoubleDoorInvite from "@/components/DoubleDoorInvite";
import RsvpForm from "@/components/RsvpForm";

export default function RsvpPage() {
  return (
    <section className="chapter on-dark">
      <ChapterSubNav
        chapterLabel="CHAPTER 04"
        title="RSVP"
        back={{ href: "/registry", label: "REGISTRY" }}
        next={{ href: "/gallery", label: "GALLERY" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 04 — THE INVITATION"
        title="RSVP"
        lede="Tap the card to open the invitation, then scroll down for the form."
        dark
      />
      <DoubleDoorInvite />
      <RsvpForm />
      <PagBar
        prev={{ href: "/registry", label: "REGISTRY" }}
        page="04"
        next={{ href: "/gallery", label: "GALLERY" }}
      />
    </section>
  );
}
