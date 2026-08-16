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

        <div className="rsvp-contact">
          <div className="eyebrow">QUESTIONS?</div>
          <p className="rsvp-contact-note">
            For any other information, please contact the following persons:
          </p>
          <div className="rsvp-contact-list">
            <div className="rsvp-contact-person">
              <span className="rsvp-contact-name">Papa Yaw</span>
              <span className="rsvp-contact-phones">
                <a href="tel:0501044087">0501 044 087</a>
                <span aria-hidden="true">/</span>
                <a href="tel:0533854473">0533 854 473</a>
              </span>
            </div>
            <div className="rsvp-contact-person">
              <span className="rsvp-contact-name">Adubofour</span>
              <span className="rsvp-contact-phones">
                <a href="tel:0557880560">0557 880 560</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <PagBar
        prev={{ href: "/details", label: "THE DETAILS" }}
        next={{ href: "/guest-gallery", label: "GUEST GALLERY" }}
      />
    </section>
  );
}
