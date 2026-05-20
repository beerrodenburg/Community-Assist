// v1: solid white backdrop. v2 will swap this for a scroll-driven video frame sequence.
export function Background() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-[color:var(--color-paper)]"
    />
  );
}
