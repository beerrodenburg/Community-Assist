"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useTiltMotion } from "@/lib/useTiltMotion";
import type { Slide } from "./slides.data";

type Props = {
  slide: Slide;
  y: MotionValue<string>;
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  pointerEvents: MotionValue<"auto" | "none">;
  zIndex: number;
  priority?: boolean;
};

export function SlideCard({
  slide,
  y,
  rotateX,
  scale,
  opacity,
  pointerEvents,
  zIndex,
  priority,
}: Props) {
  const {
    rotateX: tiltRotateX,
    rotateY: tiltRotateY,
    onMouseMove,
    onMouseLeave,
  } = useTiltMotion();

  const composedRotateX = useTransform(
    [rotateX, tiltRotateX] as MotionValue<number>[],
    ([slideUp, tilt]: number[]) => slideUp + tilt,
  );

  return (
    <motion.div
      style={{ pointerEvents, zIndex, opacity }}
      className="absolute inset-0 grid place-items-center [perspective:1400px]"
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          y,
          scale,
          rotateX: composedRotateX,
          rotateY: tiltRotateY,
          transformOrigin: "50% 100%",
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
