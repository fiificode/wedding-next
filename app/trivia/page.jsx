import ChapterHero from "@/components/ChapterHero";
import PagBar from "@/components/PagBar";
import ChapterSubNav from "@/components/ChapterSubNav";
import Quiz from "@/components/Quiz";

export default function TriviaPage() {
  return (
    <section className="chapter">
      <ChapterSubNav
        chapterLabel="CHAPTER 06"
        title="Trivia"
        back={{ href: "/gallery", label: "OUR GALLERY" }}
        next={{ href: "/guestbook", label: "GUESTBOOK" }}
      />
      <ChapterHero
        eyebrow="THE ULTIMATE TEST"
        title={
          <>
            How Well Do You <em>Know Us?</em>
          </>
        }
        lede="Test your knowledge about our love story. Top scorers will be entered into a special prize draw."
      />
      <div className="chapter-body">
        <Quiz />
      </div>
      <PagBar
        prev={{ href: "/gallery", label: "OUR GALLERY" }}
        page="06"
        next={{ href: "/guestbook", label: "GUESTBOOK" }}
      />
    </section>
  );
}
