import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import DoubleDoorInvite from "@/components/DoubleDoorInvite";
import RsvpForm from "@/components/RsvpForm";

export default function RsvpPage() {
  return (
    <section className="chapter">
      <ChapterHero
        eyebrow="THE INVITATION"
        title="RSVP"
        lede="Tap the card to open the invitation, then scroll down for the form."
      />
      <DoubleDoorInvite />
      <div className="chapter-body">
        <RsvpForm />
      </div>
      <PagBar
        prev={{ href: "/details", label: "THE DETAILS" }}
        next={{ href: "/guest-gallery", label: "GUEST GALLERY" }}
      />
    </section>
  );
}
