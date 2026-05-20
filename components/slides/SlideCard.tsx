"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";
import { useTiltMotion } from "@/lib/useTiltMotion";
import type { Slide } from "./slides.data";

type Props = {
  slide: Slide;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<"auto" | "none">;
  priority?: boolean;
};

export function SlideCard({
  slide,
  opacity,
  scale,
  pointerEvents,
  priority,
}: Props) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTiltMotion();

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="absolute inset-0 grid place-items-center [perspective:1400px]"
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          scale,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-[88vw] max-w-[1180px] aspect-[16/9] rounded-2xl bg-white shadow-[var(--shadow-card)] will-change-transform overflow-hidden"
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(min-width: 1280px) 1180px, 88vw"
          priority={priority}
          className="object-cover select-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
