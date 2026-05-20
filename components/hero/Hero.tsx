"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CommunityAssistHeart } from "@/components/brand/CommunityAssistHeart";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
        className="flex items-center gap-3 text-[color:var(--color-ca-blue)]"
      >
        <CommunityAssistHeart className="h-9 w-auto" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.65, 0.3, 1] }}
        className="mt-8 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.32em] text-[color:var(--color-muted)]"
      >
        Community Assist <span className="mx-2 text-[color:var(--color-ink)]/30">·</span> Bali, 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
        className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-5xl leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
      >
        Empowering Bali&rsquo;s communities through{" "}
        <span className="italic font-light text-[color:var(--color-ca-blue-deep)]">
          scholarship
        </span>{" "}
        & gathering.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0.65, 0.3, 1] }}
        className="mt-8 max-w-[44ch] text-base leading-relaxed text-[color:var(--color-muted)] md:text-lg"
      >
        A collective of Indonesian businesses raising funds for the children,
        families, and communities of Bali. Scroll for our 2026 program.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.65, 0.3, 1] }}
        className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button href="#donate" variant="primary" size="lg">
          Donate
        </Button>
        <Button href="#partner" variant="ghost" size="lg">
          Partner with us
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[color:var(--color-muted)]"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="block h-8 w-px bg-[color:var(--color-ink)]/30"
        />
      </motion.div>
    </section>
  );
}
