"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { CommunityAssistHeart } from "@/components/brand/CommunityAssistHeart";
import { slides } from "@/components/slides/slides.data";

// Maps each nav label to the zero-based index of the slide it should jump to.
// Slide numbers refer to /public/slides/slide-NN.jpg (1-based filenames).
const NAV_SLIDES: ReadonlyArray<{ label: string; index: number }> = [
  { label: "Mission", index: 1 },   // slide-02 — Our Mission & Story
  { label: "Events", index: 6 },    // slide-07 — Event lineup
  { label: "Impact", index: 8 },    // slide-09 — Our progress so far
  { label: "Sponsor", index: 15 },  // slide-16 — Sponsorship tiers intro
  { label: "Contact", index: 27 },  // slide-28 — Contact & socials
];

const DONATE_INDEX = 24; // slide-25 — How to Donate

function scrollToSlide(index: number) {
  // Mobile renders slides as a stacked list — each figure carries an id.
  const mobileTarget = document.getElementById(`slide-mobile-${index}`);
  if (mobileTarget && window.matchMedia("(max-width: 767px)").matches) {
    mobileTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Desktop pins one viewport while the track scrolls. Slide `i` peaks when
  // scrollYProgress = (i+1)/D, where D = slides.length + 1. The scrollable
  // range inside the track is (D-1) * vh = N * vh.
  const track = document.getElementById("slide-journey-track");
  if (!track) return;
  const N = slides.length;
  const D = N + 1;
  const vh = window.innerHeight;
  const trackTop = track.getBoundingClientRect().top + window.scrollY;
  const targetY = trackTop + ((index + 1) * N) / D * vh;
  window.scrollTo({ top: targetY, behavior: "smooth" });
}

export function Nav() {
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
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[color:var(--color-ca-blue-deep)] hover:bg-[color:var(--color-ink)]/[0.04]"
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
          >
            {item.label}
          </NavLink>
        ))}

        <a
          href={`#slide-${DONATE_INDEX + 1}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSlide(DONATE_INDEX);
          }}
          className="ml-1 inline-flex items-center justify-center rounded-full bg-[color:var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[color:var(--color-ca-blue-deep)]"
        >
          Donate
        </a>
      </div>
    </motion.nav>
  );
}

function NavLink({
  slideIndex,
  children,
}: {
  slideIndex: number;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#slide-${slideIndex + 1}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSlide(slideIndex);
      }}
      className="hidden rounded-full px-3 py-2 text-sm text-[color:var(--color-ink)]/80 transition-colors hover:bg-[color:var(--color-ink)]/[0.04] hover:text-[color:var(--color-ink)] md:inline-block"
    >
      {children}
    </a>
  );
}
