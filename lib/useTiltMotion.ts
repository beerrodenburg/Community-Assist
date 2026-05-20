"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 };
const MAX_DEG = 8;

export function useTiltMotion() {
  const [enabled, setEnabled] = useState(false);

  // Normalized mouse position: -1 to 1 on each axis, 0,0 = card center.
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const rotateY = useSpring(useTransform(nx, [-1, 1], [-MAX_DEG, MAX_DEG]), SPRING);
  const rotateX = useSpring(useTransform(ny, [-1, 1], [MAX_DEG, -MAX_DEG]), SPRING);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    nx.set(x * 2 - 1);
    ny.set(y * 2 - 1);
  }

  function onMouseLeave() {
    nx.set(0);
    ny.set(0);
  }

  return { enabled, rotateX, rotateY, onMouseMove, onMouseLeave };
}
