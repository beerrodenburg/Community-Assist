"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { SlideCard } from "./SlideCard";
import { slides, type Slide } from "./slides.data";
import { useLenis } from "@/lib/LenisProvider";

export function SlideJourney() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="story"
      aria-label="Community Assist 2026 story"
      className="relative"
    >
      {/* Desktop: pinned slide-up stack with snap-on-rest */}
      <div className="hidden md:block">
        {reducedMotion ? <MobileStack /> : <DesktopJourney />}
      </div>

      {/* Mobile: simple stacked fade-in */}
      <div className="md:hidden">
        <MobileStack />
      </div>
    </section>
  );
}

function DesktopJourney() {
  const N = slides.length;
  // One extra viewport of scroll tail so the last slide gets dwell time
  // before the section releases into the Finale.
  const D = N + 1;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useJourneySnap(containerRef);

  // Only mount slides whose active window includes the current scroll position.
  // Past slides leave the DOM entirely (no opacity-0 leftovers), and future
  // slides only appear in time to start their entry animation.
  const [activeIndices, setActiveIndices] = useState<number[]>(() =>
    computeActive(scrollYProgress.get(), N),
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = computeActive(v, N);
    setActiveIndices((prev) => (sameMembership(prev, next) ? prev : next));
  });

  return (
    <div
      ref={containerRef}
      id="slide-journey-track"
      style={{ height: `${D * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {activeIndices.map((i) => (
          <ActiveSlideItem
            key={slides[i].src}
            slide={slides[i]}
            index={i}
            totalSlides={N}
            scrollYProgress={scrollYProgress}
            priority={i < 3}
          />
        ))}
      </div>
    </div>
  );
}

function computeActive(v: number, N: number): number[] {
  const eps = 0.005;
  const out: number[] = [];
  for (let i = 0; i < N; i++) {
    const start = i === 0 ? 0 : (i - 0.5) / N - eps;
    const end = i === N - 1 ? Number.POSITIVE_INFINITY : (i + 1) / N;
    if (v >= start && v < end) out.push(i);
  }
  return out;
}

function sameMembership(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function ActiveSlideItem({
  slide,
  index,
  totalSlides,
  scrollYProgress,
  priority,
}: {
  slide: Slide;
  index: number;
  totalSlides: number;
  scrollYProgress: MotionValue<number>;
  priority?: boolean;
}) {
  // Settled position of slide i: progress = i / N.
  // Entry window: [(i - 0.5)/N, i/N] — rise into place from below.
  // Settled dwell:  [i/N, (i + 0.5)/N] — at rest, on top.
  // Exit window:    [(i + 0.5)/N, (i + 1)/N] — shrink + fade as the next slide rises in.
  // Slide 0 has no real entry (negative range clamps); last slide has no exit.
  const N = totalSlides;
  const enterStart = (index - 0.5) / N;
  const settled = index / N;
  const nextRising = (index + 0.5) / N;
  const gone = (index + 1) / N;
  const isLast = index === N - 1;

  // Start the card fully below the viewport (100vh below resting position) so
  // it can't peek above the bottom of the sticky clip box at mount time —
  // % is relative to card height, which on tall viewports leaves a sliver
  // visible. vh is always enough.
  const y = useTransform(
    scrollYProgress,
    [enterStart, settled],
    ["100vh", "0vh"],
  );
  const rotateX = useTransform(scrollYProgress, [enterStart, settled], [20, 0]);

  // Scale: 0.85 (below) → 1.0 (settled) → 0.85 (shrunk into the stack behind the next card).
  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [enterStart, settled]
      : [enterStart, settled, nextRising, gone],
    isLast ? [0.85, 1.0] : [0.85, 1.0, 1.0, 0.85],
  );

  // Opacity: stay opaque until the next slide starts rising, then fade out.
  const opacity = useTransform(
    scrollYProgress,
    isLast ? [enterStart, settled] : [nextRising, gone],
    isLast ? [1, 1] : [1, 0],
  );

  const pointerEvents = useTransform(scrollYProgress, (v) => {
    if (v < settled) return "none" as const;
    if (isLast) return "auto" as const;
    if (v >= nextRising) return "none" as const;
    return "auto" as const;
  });

  return (
    <SlideCard
      slide={slide}
      y={y}
      rotateX={rotateX}
      scale={scale}
      opacity={opacity}
      pointerEvents={pointerEvents}
      zIndex={index}
      priority={priority}
    />
  );
}

/**
 * Snap the page to the nearest slide-settled position once the user's scroll
 * has come to rest inside the journey track. Scoped to the track range so
 * Hero/Finale scrolling stays free.
 */
function useJourneySnap(containerRef: RefObject<HTMLDivElement | null>) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const container = containerRef.current;
    if (!container) return;

    let restTimer: number | null = null;

    const onScroll = () => {
      if (restTimer !== null) {
        window.clearTimeout(restTimer);
      }
      restTimer = window.setTimeout(() => {
        restTimer = null;
        if (Math.abs(lenis.velocity) > 0.05) return;

        const vh = window.innerHeight;
        const trackStart = container.offsetTop;
        const trackEnd = trackStart + container.offsetHeight - vh;
        if (trackEnd <= trackStart) return;

        const scroll = lenis.scroll;
        if (scroll < trackStart - 1 || scroll > trackEnd + 1) return;

        const offset = scroll - trackStart;
        const k = Math.round(offset / vh);
        const target = trackStart + k * vh;
        if (Math.abs(target - scroll) < 1) return;

        lenis.scrollTo(target, {
          duration: 0.55,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      }, 140);
    };

    const unsubscribe = lenis.on("scroll", onScroll);

    return () => {
      unsubscribe();
      if (restTimer !== null) window.clearTimeout(restTimer);
    };
  }, [lenis, containerRef]);
}

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const update = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return prefers;
}

function MobileStack() {
  return (
    <div className="flex flex-col gap-12 px-4 py-16">
      {slides.map((slide, i) => (
        <motion.figure
          key={slide.src}
          id={`slide-mobile-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 1] }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-white shadow-[var(--shadow-card)]"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="92vw"
            priority={i === 0}
            className="object-cover"
          />
        </motion.figure>
      ))}
    </div>
  );
}
