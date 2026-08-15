# [Your Names] — The Wedding Issue (Next.js template)

A digital-magazine style wedding website, built with Next.js (App Router) and Framer Motion.
Modeled closely on a reference site's interaction design — not just the look, but the actual
motion system: a preloader, a custom trailing cursor, click-anchored circular page transitions,
scroll-triggered reveals, a sticky chapter sub-nav, a scrollytelling "Our Story" layout, a live
countdown, a sliding double-door RSVP invitation, a masonry gallery, and a real scored quiz.

Every piece of actual content is a bracketed placeholder (`[Partner One]`, `[Venue Name]`,
`[DD.MM.YYYY]`, etc.) — swap those for your own details.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

- `app/page.jsx` — the cover (magazine front page)
- `app/contents/page.jsx` — the table of contents
- `app/story/page.jsx`, `details`, `registry`, `rsvp`, `gallery`, `trivia` — the six chapters,
  each its own route
- `app/layout.jsx` — loads the Google Fonts (Playfair Display + Inter) via `next/font`, and
  mounts the preloader, custom cursor, and page-transition provider around every page
- `app/globals.css` — all styling and design tokens (colors, fonts, animations) in one file

### Components

- `TransitionProvider` / `TransitionLink` — the click-anchored circular page-wipe transition.
  Any internal link should use `TransitionLink` instead of `next/link`'s `Link` so it
  participates in the transition.
- `Preloader` — the "A & B" loading screen shown once per session on first load.
- `CustomCursor` — the trailing ring cursor (auto-disabled on touch devices).
- `ChapterSubNav` — the sticky "← Contents · Chapter 0X · Title · Next →" bar that slides in
  once you scroll past a chapter's hero.
- `ScrollRail` — the vertical line + dot that tracks scroll progress next to a chapter's content.
- `Reveal` — scroll-triggered fade-up wrapper (`<Reveal delay={0.1}>...</Reveal>`), used
  throughout for the staggered entrance animations.
- `TocList` — the Contents page list; hovering a row reveals a thumbnail and smoothly pushes
  the rows below down (a Framer Motion `layout` animation).
- `Countdown` — live ticking days/hrs/min/sec countdown to a target date, used on the Details
  page.
- `DoubleDoorInvite` — the RSVP invitation: two doors slide apart to reveal a formal invite card.
- `Quiz` — the Trivia chapter's full scored quiz (intro screen → questions → results).
- `ChapterHero`, `PagBar`, `RsvpForm` — shared building blocks.

## Things to customize

- **Cover photo**: `.cover` in `app/globals.css` currently uses a dark textured gradient as a
  placeholder. Swap the `background` for `background-image: url(/your-photo.jpg)` (drop the
  image in `public/`).
- **Names, dates, venue, story copy**: search each file under `app/` for bracketed text like
  `[Partner One]` and replace it.
- **Our Story / Details photos**: both pages render dashed-border placeholder blocks
  (`.media-ph`) in `app/story/page.jsx` and `app/details/page.jsx`. Replace the `<div
  className="media-ph ...">` with `<Image>` (from `next/image`) pointing at your own photos.
- **Countdown dates**: `app/details/page.jsx` passes sample target dates to `<Countdown
  date="..." />` — update them to your real ceremony date/times (ISO format).
- **Gallery photos**: `app/gallery/page.jsx` renders 6 colored placeholder tiles. Replace the
  `<div className="tile-ph">` blocks with `<Image>` pointing at your own photos.
- **RSVP form**: `components/RsvpForm.jsx` just shows an alert on submit. Point it at a real
  endpoint — a Next.js Route Handler (`app/api/rsvp/route.js`), Formspree, Google Forms, Airtable,
  etc.
- **Quiz questions**: `components/Quiz.jsx` has a `QUESTIONS` array at the top — replace the
  sample questions/options/correct answers with real ones about the two of you.
- **Colors**: the palette lives at the top of `app/globals.css` as CSS variables
  (`--cream`, `--ink`, `--accent1/2/3`) — change those and the whole gradient/accent system
  updates everywhere.

## Notes on the animation system

- The circular page transition (`TransitionProvider`) intercepts clicks on any `TransitionLink`,
  grows a dark circle from the click point to cover the screen, swaps the route underneath, then
  shrinks the circle back down to reveal the new page. If you add new internal links, use
  `TransitionLink` (not `next/link`) so they get this treatment.
- The preloader only shows once per session because its state lives in a client component
  mounted at the root layout, which persists across client-side navigations — it won't
  re-appear when you click between chapters, only on a hard reload.
- `ScrollRail` and `ChapterSubNav` both read `window.scrollY` — they're client components and
  only run in the browser.

## Deploying

This is a stock Next.js app, so it deploys as-is to Vercel, Netlify, or any Node host:

```bash
npm run build
npm run start
```
