"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type Lenis from "lenis";
import { CommunityAssistHeart } from "@/components/brand/CommunityAssistHeart";
import { useLenis } from "@/lib/LenisProvider";

// Maps each nav label to the zero-based index of the slide it should jump to.
// Slide numbers refer to /public/slides/slide-NN.jpg (1-based filenames).
const NAV_SLIDES: ReadonlyArray<{ label: string; index: number }> = [
  { label: "Mission", index: 1 },      // slide-02 — Our Mission & Story
  { label: "Events", index: 5 },       // slide-06 — "The 4 Events" section divider
  { label: "Scholarship", index: 12 }, // slide-13 — Ragam Educational Scholarship Program
  { label: "Impact", index: 14 },      // slide-15 — Stories of Impact
  { label: "Sponsor", index: 21 },     // slide-22 — Businesses Sponsor Tiers
];

// All scroll helpers prefer Lenis (the smooth-scroll engine used site-wide).
// Native window.scrollTo / Element.scrollIntoView race against Lenis's RAF loop,
// which made first clicks feel ignored. Lenis is null only under
// prefers-reduced-motion — in that case we fall back to native instant scroll.

function scrollToY(lenis: Lenis | null, y: number) {
  if (lenis) {
    lenis.scrollTo(y, { force: true });
  } else {
    window.scrollTo({ top: y });
  }
}

function scrollToElementId(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { force: true });
  } else {
    el.scrollIntoView({ block: "start" });
  }
}

function scrollToSlide(lenis: Lenis | null, index: number) {
  // Mobile renders slides as a stacked list — each figure carries an id.
  const mobileTarget = document.getElementById(`slide-mobile-${index}`);
  if (mobileTarget && window.matchMedia("(max-width: 767px)").matches) {
    if (lenis) lenis.scrollTo(mobileTarget, { force: true });
    else mobileTarget.scrollIntoView({ block: "start" });
    return;
  }

  // Desktop pins one viewport while the track scrolls. The track is D*vh tall
  // with a vh-sized sticky inner box, so the scrollable range is (D-1)*vh = N*vh
  // and slide `i` settles at scroll progress i/N — i.e. trackTop + i*vh.
  const track = document.getElementById("slide-journey-track");
  if (!track) return;
  const vh = window.innerHeight;
  const trackTop = track.getBoundingClientRect().top + window.scrollY;
  const targetY = trackTop + index * vh;
  scrollToY(lenis, targetY);
}

export function Nav() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  // Hidden until scrolled past ~half of hero, fully visible by one viewport
  const opacity = useTransform(scrollY, [0, 320, 640], [0, 0, 1]);
  const y = useTransform(scrollY, [0, 640], [-12, 0]);

  return (
    <motion.nav
      style={{ opacity, y }}
      aria-label="Page navigation"
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6"
    >
      <div className="flex items-center gap-1 rounded-full border border-[color:var(--color-ink)]/10 bg-white/80 px-2 py-2 shadow-[0_8px_30px_-12px_rgb(0_0_0_/_0.2)] backdrop-blur-md">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToY(lenis, 0);
          }}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[color:var(--color-ca-pink)] hover:bg-[color:var(--color-ink)]/[0.04]"
          aria-label="Back to top"
        >
          <CommunityAssistHeart className="h-5 w-auto" />
          <span className="hidden font-[family-name:var(--font-display)] text-sm tracking-tight text-[color:var(--color-ink)] lg:inline">
            Community Assist
          </span>
        </a>

        <span aria-hidden className="hidden h-5 w-px bg-[color:var(--color-ink)]/15 md:block" />

        {NAV_SLIDES.map((item) => (
          <NavLink
            key={item.label}
            slideIndex={item.index}
            onSelect={() => scrollToSlide(lenis, item.index)}
          >
            {item.label}
          </NavLink>
        ))}

        <a
          href="#contribute"
          onClick={(e) => {
            e.preventDefault();
            scrollToElementId(lenis, "contribute");
          }}
          className="ml-1 inline-flex items-center justify-center rounded-full bg-[color:var(--color-ca-pink)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[color:var(--color-ca-pink-deep)]"
        >
          Donate
        </a>
      </div>
    </motion.nav>
  );
}

function NavLink({
  slideIndex,
  onSelect,
  children,
}: {
  slideIndex: number;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#slide-${slideIndex + 1}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect();
      }}
      className="hidden rounded-full px-3 py-2 text-sm text-[color:var(--color-ink)]/80 transition-colors hover:bg-[color:var(--color-ink)]/[0.04] hover:text-[color:var(--color-ink)] md:inline-block"
    >
      {children}
    </a>
  );
}
