import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import ChapterSubNav from "@/components/ChapterSubNav";
import DoubleDoorInvite from "@/components/DoubleDoorInvite";
import RsvpForm from "@/components/RsvpForm";

export default function RsvpPage() {
  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 04"
        title="RSVP"
        back={{ href: "/details", label: "THE DETAILS" }}
        next={{ href: "/guest-gallery", label: "GUEST GALLERY" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 04 — THE INVITATION"
        title="RSVP"
        lede="Tap the card to open the invitation, then scroll down for the form."
        dark
      />
      <DoubleDoorInvite />
      <div className="chapter-body">
        <RsvpForm />
      </div>
      <PagBar
        prev={{ href: "/details", label: "THE DETAILS" }}
        page="04"
        next={{ href: "/guest-gallery", label: "GUEST GALLERY" }}
      />
    </section>
  );
}
