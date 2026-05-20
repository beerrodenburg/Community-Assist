"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { SlideCard } from "./SlideCard";
import { slides, type Slide } from "./slides.data";

export function SlideJourney() {
  return (
    <section
      id="story"
      aria-label="Community Assist 2026 story"
      className="relative"
    >
      {/* Desktop: pinned crossfade & scale */}
      <div className="hidden md:block">
        <DesktopJourney />
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
  const D = N + 1; // total slot count = slides + 1 viewport of buffer split across ends
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      id="slide-journey-track"
      style={{ height: `${D * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        {slides.map((slide, i) => (
          <SlideItem
            key={slide.src}
            slide={slide}
            index={i}
            totalSlots={D}
            scrollYProgress={scrollYProgress}
            priority={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function SlideItem({
  slide,
  index,
  totalSlots,
  scrollYProgress,
  priority,
}: {
  slide: Slide;
  index: number;
  totalSlots: number;
  scrollYProgress: MotionValue<number>;
  priority?: boolean;
}) {
  const fadeInKey = index / totalSlots;
  const peakKey = (index + 1) / totalSlots;
  const fadeOutKey = (index + 2) / totalSlots;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInKey, peakKey, fadeOutKey],
    [0, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [fadeInKey, peakKey, fadeOutKey],
    [1.08, 1.0, 0.92],
  );
  const pointerEvents = useTransform(opacity, (v) =>
    v > 0.7 ? ("auto" as const) : ("none" as const),
  );

  return (
    <SlideCard
      slide={slide}
      opacity={opacity}
      scale={scale}
      pointerEvents={pointerEvents}
      priority={priority}
    />
  );
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
