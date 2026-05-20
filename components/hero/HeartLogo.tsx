import { clsx } from "clsx";

// Stylized striped-heart logo inspired by the Community Assist brand mark.
// Bars are clipped by a heart path so the negative space between them reveals page color.
export function HeartLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 90"
      role="img"
      aria-label="Community Assist"
      fill="currentColor"
      className={clsx(className)}
    >
      <defs>
        <clipPath id="ca-heart-clip">
          <path d="M50,84 C 24,68 6,52 6,30 C 6,14 22,6 36,18 C 42,23 47,30 50,34 C 53,30 58,23 64,18 C 78,6 94,14 94,30 C 94,52 76,68 50,84 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#ca-heart-clip)">
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={i} x="0" y={4 + i * 7} width="100" height="4" />
        ))}
      </g>
    </svg>
  );
}
