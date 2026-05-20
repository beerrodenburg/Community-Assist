"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CommunityAssistLogo } from "@/components/brand/CommunityAssistLogo";

type Doodle = {
  src: string;
  width: number;
  height: number;
  position: string;
  size: string;
  rotate: number;
  delay: number;
};

const DOODLES: Doodle[] = [
  {
    src: "/doodles/starburst-left.png",
    width: 862,
    height: 955,
    position: "left-[2%] top-[46%] -translate-y-1/2 md:left-[3%] lg:left-[5%]",
    size: "h-44 md:h-56 lg:h-72 xl:h-80",
    rotate: -6,
    delay: 0.85,
  },
  {
    src: "/doodles/starburst-right.png",
    width: 638,
    height: 850,
    position: "right-[2%] top-[50%] -translate-y-1/2 md:right-[3%] lg:right-[5%]",
    size: "h-44 md:h-56 lg:h-72 xl:h-80",
    rotate: 8,
    delay: 0.95,
  },
  {
    src: "/doodles/star-open-teams.png",
    width: 290,
    height: 230,
    position: "right-[18%] top-[18%] md:right-[22%] lg:right-[26%]",
    size: "h-10 md:h-12 lg:h-14",
    rotate: -10,
    delay: 1.05,
  },
  {
    src: "/doodles/heart-youth.png",
    width: 225,
    height: 250,
    position: "left-[16%] bottom-[20%] md:left-[20%] lg:left-[24%]",
    size: "h-10 md:h-12 lg:h-14",
    rotate: -8,
    delay: 1.15,
  },
  {
    src: "/doodles/smiley-women.png",
    width: 190,
    height: 245,
    position: "right-[20%] bottom-[22%] md:right-[24%] lg:right-[28%]",
    size: "h-10 md:h-12 lg:h-14",
    rotate: 6,
    delay: 1.25,
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {DOODLES.map((d) => (
          <motion.div
            key={d.src}
            initial={{ opacity: 0, scale: 0.7, rotate: d.rotate }}
            animate={{ opacity: 1, scale: 1, rotate: d.rotate }}
            transition={{ duration: 0.9, delay: d.delay, ease: [0.2, 0.65, 0.3, 1] }}
            className={`absolute ${d.position}`}
          >
            <Image
              src={d.src}
              alt=""
              width={d.width}
              height={d.height}
              className={`${d.size} w-auto select-none opacity-90`}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
        className="flex items-center gap-3 text-[color:var(--color-ca-pink)]"
      >
        <CommunityAssistLogo className="h-20 w-auto md:h-24" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
        className="mt-10 max-w-[18ch] font-[family-name:var(--font-display)] text-5xl leading-[1.02] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
      >
        Empowering Bali&rsquo;s communities through{" "}
        <span className="italic font-light text-[color:var(--color-ca-blue)]">
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
        <Button href="#contribute" variant="primary" size="lg">
          Donate
        </Button>
        <Button href="#contribute" variant="ghost" size="lg">
          Partner with us
        </Button>
      </motion.div>

    </section>
  );
}
