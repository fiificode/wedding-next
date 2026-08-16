import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";
import ChapterSubNav from "@/components/ChapterSubNav";

const CONTACT = {
  name: "[Coordinator Name]",
  role: "Day-of Coordinator",
  phone: "[+233 XX XXX XXXX]",
  email: "[coordinator@email.com]",
};

const SCHEDULE_DAYS = [
  {
    date: "Friday, October 9",
    label: "Traditional Ceremony",
    rows: [
      ["8:00 AM", "Vendor load-in", "[Loading dock / entrance instructions]"],
      [
        "10:00 AM",
        "Ceremony begins",
        "Presbyterian Church of Ghana, Kaneshie Congregation",
      ],
      [
        "1:00 PM",
        "Ceremony ends / breakdown",
        "[Curfew or venue turnover notes]",
      ],
    ],
  },
  {
    date: "Saturday, October 10",
    label: "White Wedding & Reception",
    rows: [
      ["10:00 AM", "Vendor load-in", "[Loading dock / entrance instructions]"],
      [
        "1:00 PM",
        "Ceremony begins",
        "Presbyterian Church of Ghana, Kaneshie Congregation",
      ],
      ["4:00 PM", "Reception begins", "[Reception venue name & address]"],
      ["11:00 PM", "Breakdown & load-out", "[Curfew / noise restriction note]"],
    ],
  },
];

const VENUES = [
  {
    name: "Presbyterian Church of Ghana",
    sub: "Kaneshie Congregation, Kaneshie, Accra",
    notes: ["[Parking / loading instructions]", "[On-site contact for access]"],
  },
  {
    name: "[Reception Venue Name]",
    sub: "[Reception Venue Address]",
    notes: [
      "[Parking / loading instructions]",
      "[WiFi network & password]",
      "[Power access for equipment]",
    ],
  },
];

const GOOD_TO_KNOW = [
  "Certificate of insurance required for all vendors on site",
  "Meals are provided for vendor crews during the reception",
  "Please check in with the day-of coordinator upon arrival",
  "[Add any other site-specific rules — noise curfew, flame policy, etc.]",
];

export default function VendorsPage() {
  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 06"
        title="For Our Vendors"
        back={{ href: "/guestbook", label: "GUESTBOOK" }}
        next={{ href: "/contents", label: "CONTENTS" }}
      />
      <ChapterHero
        eyebrow="CHAPTER 06"
        title={
          <>
            For Our <em>Vendors</em>
          </>
        }
        lede="Everything your team needs for load-in, timing, and logistics on the day."
        dark
      />

      <div className="chapter-body chapter-spaced">
        <Reveal as="div" delay={0.1} className="vendor-contact">
          <div className="eyebrow">DAY-OF CONTACT</div>
          <h4>{CONTACT.name}</h4>
          <div className="vendor-contact-role">{CONTACT.role}</div>
          <div className="vendor-contact-links">
            <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </Reveal>

        <div className="vendor-timeline">
          <Reveal as="p" delay={0.14} className="vendor-section-title">
            Day-of Schedule
          </Reveal>
          {SCHEDULE_DAYS.map((day, di) => (
            <Reveal
              as="div"
              delay={0.18 + di * 0.06}
              className="vendor-day"
              key={day.date}
            >
              <div className="vendor-day-head">
                <div className="vendor-day-date">{day.date}</div>
                <div className="vendor-day-label">{day.label}</div>
              </div>
              <div className="vendor-schedule">
                {day.rows.map(([time, event, note]) => (
                  <div className="vendor-row" key={time + event}>
                    <div className="vendor-row-time">{time}</div>
                    <div>
                      <div className="vendor-row-event">{event}</div>
                      <div className="vendor-row-note">{note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          delay={0.1}
          className="vendor-section-title"
          style={{ marginTop: 90 }}
        >
          Venues
        </Reveal>
        <div className="vendor-venues">
          {VENUES.map((v, i) => (
            <Reveal
              as="div"
              delay={i * 0.08}
              className="vendor-venue-card"
              key={v.name}
            >
              <h5>{v.name}</h5>
              <div className="vv-sub">{v.sub}</div>
              <ul>
                {v.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          delay={0.1}
          className="vendor-section-title"
          style={{ marginTop: 90 }}
        >
          Good to Know
        </Reveal>
        <ul
          className="guest-perks"
          style={{ maxWidth: 600, margin: "24px auto 0" }}
        >
          {GOOD_TO_KNOW.map((item) => (
            <li key={item}>
              <span className="perk-spark">✦</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="vendor-download">
          <div className="detail-actions" style={{ justifyContent: "center" }}>
            <a href="#" className="filled">
              DOWNLOAD VENDOR INFO SHEET
            </a>
          </div>
        </div>
      </div>

      <PagBar
        prev={{ href: "/guestbook", label: "GUESTBOOK" }}
        page="06"
        next={{ href: "/", label: "BACK TO COVER" }}
      />
    </section>
  );
}
