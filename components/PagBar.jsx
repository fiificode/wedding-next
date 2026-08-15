import TransitionLink from "@/components/TransitionLink";

export default function PagBar({ prev, page, next }) {
  return (
    <div className="pagbar">
      <TransitionLink href={prev.href}>← {prev.label}</TransitionLink>
      <span className="center">PAGE {page}</span>
      <TransitionLink href={next.href}>{next.label} →</TransitionLink>
    </div>
  );
}
