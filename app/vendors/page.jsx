import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import Reveal from "@/components/Reveal";

const VENDOR_CATEGORIES = [
  {
    category: "Coordinator",
    people: [{ name: "Events by Pinkies", phone: "0244370449" }],
  },
  {
    category: "Planners",
    people: [
      { name: "Idrys", phone: "0592841425" },
      { name: "Grace", phone: "0549208080" },
    ],
  },
  {
    category: "Decor",
    people: [{ name: "RK Pride", phone: "0596502248", ig: "rk_prides_" }],
  },
  {
    category: "Photography & Videography",
    people: [
      { name: "Nuels Photography", phone: "+447442813601", ig: "nuels_photography" },
    ],
  },
  {
    category: "Bride's Gown",
    people: [{ name: "Ruby's Bridal", phone: "0244235143", ig: "rubysbridal" }],
  },
  {
    category: "Bride's Kente",
    people: [{ name: "Aunty Evelyn", phone: "0243110765" }],
  },
  {
    category: "Bride's Makeup",
    people: [
      { name: "Naya's Strokes Artistry", phone: "0202552923", ig: "naya_strokes_" },
    ],
  },
  {
    category: "Bride's Hair",
    people: [
      { name: "EstheticQ Beauty Studio", phone: "0204057562", ig: "estheticq_md" },
    ],
  },
  {
    category: "Bridesmaids' Dress",
    people: [{ name: "Unikay", phone: "0247538360", ig: "_unikay" }],
  },
  {
    category: "Bridesmaids' Makeup",
    people: [
      { name: "KayElla Beauty Studio", phone: "0206388145", ig: "kayella_beauty_studio" },
    ],
  },
  {
    category: "Groom's Suit",
    people: [{ name: "Blondom Tribe", phone: "0538854337", ig: "blondom__" }],
  },
  {
    category: "Catering",
    people: [{ name: "Elohim Catering Services" }],
  },
  {
    category: "Sound",
    people: [{ name: "NOD Production", phone: "0209056432", ig: "nod.production" }],
  },
  {
    category: "Flower Girls' Dress",
    people: [
      { name: "Frebys Fashion", phone: "0244720197", ig: "frebys_fashiongh" },
    ],
  },
  {
    category: "Wedding Cake",
    people: [
      { name: "Creamy Haven by Benny", phone: "0550931509", ig: "creamy__haven" },
    ],
  },
];

function telHref(phone) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  return `tel:+233${digits.replace(/^0/, "")}`;
}

export default function VendorsPage() {
  return (
    <section className="chapter">
      <ChapterHero
        eyebrow="WITH GRATITUDE"
        title={
          <>
            For Our <em>Vendors</em>
          </>
        }
        lede="The incredible team behind every detail of our day — please give them some love."
      />

      <div className="chapter-body chapter-spaced">
        <div className="vendor-grid">
          {VENDOR_CATEGORIES.map((cat) => (
            <Reveal
              as="div"
              delay={0}
              className="vendor-card"
              key={cat.category}
            >
              <div className="eyebrow">{cat.category}</div>
              <div className="vendor-card-people">
                {cat.people.map((p) => (
                  <div className="vendor-card-person" key={p.name}>
                    <div className="vendor-card-name">{p.name}</div>
                    {(p.phone || p.ig) && (
                      <div className="vendor-card-contacts">
                        {p.phone && (
                          <a href={telHref(p.phone)}>{p.phone}</a>
                        )}
                        {p.ig && (
                          <a
                            href={`https://instagram.com/${p.ig}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @{p.ig}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <PagBar
        prev={{ href: "/guestbook", label: "GUESTBOOK" }}
        next={{ href: "/", label: "BACK TO COVER" }}
      />
    </section>
  );
}
