"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { useLenis } from "@/lib/LenisProvider";

const FRAME_COUNT = 300;
const PRIORITY_FRAMES = 12;
const FADE_IN_END = 0.06;
const FADE_OUT_START = 0.94;
const PAPER = "#efeceb";

function frameUrl(i: number): string {
  return `/clouds/frame_${String(i + 1).padStart(4, "0")}.webp`;
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const lastDrawnIndexRef = useRef<number>(-1);
  const trackRectRef = useRef<{ top: number; height: number } | null>(null);
  const renderRef = useRef<() => void>(() => {});

  const opacityMV = useMotionValue(0);
  const lenis = useLenis();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMQ = window.matchMedia("(max-width: 767px)");
    const update = () => setEnabled(!reducedMQ.matches && !mobileMQ.matches);
    update();
    reducedMQ.addEventListener("change", update);
    mobileMQ.addEventListener("change", update);
    return () => {
      reducedMQ.removeEventListener("change", update);
      mobileMQ.removeEventListener("change", update);
    };
  }, []);

  // Single render pipeline lives inside an effect so closures over refs are
  // stable. Everything that needs to redraw — scroll, frame load, resize,
  // initial mount — calls renderRef.current().
  useEffect(() => {
    if (!enabled) return;

    function measure() {
      const el = document.getElementById("slide-journey-track");
      if (!el) {
        trackRectRef.current = null;
        return;
      }
      const rect = el.getBoundingClientRect();
      trackRectRef.current = {
        top: rect.top + window.scrollY,
        height: el.offsetHeight,
      };
    }

    function sizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      lastDrawnIndexRef.current = -1;
    }

    function drawFrame(index: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const img = framesRef.current[index];
      if (!img) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnIndexRef.current = index;
    }

    function nearestAvailable(target: number): number {
      const images = framesRef.current;
      if (images[target]) return target;
      for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && images[lo]) return lo;
        if (hi < FRAME_COUNT && images[hi]) return hi;
      }
      return -1;
    }

    function render() {
      const rect = trackRectRef.current;
      const canvas = canvasRef.current;
      if (!rect || !canvas) {
        opacityMV.set(0);
        return;
      }
      const vh = window.innerHeight;
      const range = rect.height - vh;
      if (range <= 0) {
        opacityMV.set(0);
        return;
      }
      const y =
        lenis && typeof lenis.scroll === "number" ? lenis.scroll : window.scrollY;
      const progress = (y - rect.top) / range;
      const clamped = Math.max(0, Math.min(1, progress));

      let opacity: number;
      if (progress <= 0) opacity = 0;
      else if (progress < FADE_IN_END) opacity = progress / FADE_IN_END;
      else if (progress < FADE_OUT_START) opacity = 1;
      else if (progress < 1)
        opacity = (1 - progress) / (1 - FADE_OUT_START);
      else opacity = 0;
      opacityMV.set(opacity);

      if (opacity <= 0) return;

      const target = Math.min(
        FRAME_COUNT - 1,
        Math.floor(clamped * (FRAME_COUNT - 1)),
      );
      const idx = nearestAvailable(target);
      if (idx === -1 || idx === lastDrawnIndexRef.current) return;
      drawFrame(idx);
    }

    renderRef.current = render;

    measure();
    sizeCanvas();
    const settleRaf = window.requestAnimationFrame(() => {
      measure();
      sizeCanvas();
      render();
    });
    render();

    const onResize = () => {
      measure();
      sizeCanvas();
      render();
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => render();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(settleRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      renderRef.current = () => {};
    };
  }, [enabled, lenis, opacityMV]);

  useEffect(() => {
    if (!enabled || !lenis) return;
    const unsubscribe = lenis.on("scroll", () => renderRef.current());
    renderRef.current();
    return () => {
      unsubscribe();
    };
  }, [enabled, lenis]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    framesRef.current = images;

    const load = (i: number) => {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      img.onload = () => {
        if (cancelled) return;
        images[i] = img;
        renderRef.current();
      };
    };

    for (let i = 0; i < PRIORITY_FRAMES; i++) load(i);
    const tailTimer = window.setTimeout(() => {
      if (cancelled) return;
      for (let i = PRIORITY_FRAMES; i < FRAME_COUNT; i++) load(i);
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(tailTimer);
      framesRef.current = [];
      lastDrawnIndexRef.current = -1;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity: opacityMV }}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
