"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Footer } from "./Footer";

// TODO: replace with the real partnerships contact once provided.
const PARTNER_EMAIL = "hello@communityassist.id";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 1] as const },
};

export function Finale() {
  return (
    <section
      id="contribute"
      className="relative bg-[color:var(--color-paper)] px-6 pt-32 pb-16 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...reveal}
          className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-muted)]"
        >
          Be part of 2026
        </motion.p>
        <motion.h2
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="mt-4 max-w-[20ch] font-[family-name:var(--font-display)] text-5xl leading-[1.05] tracking-[-0.02em] text-[color:var(--color-ink)] md:text-6xl lg:text-7xl"
        >
          Two ways to{" "}
          <span className="italic font-light text-[color:var(--color-ca-blue-deep)]">
            join us.
          </span>
        </motion.h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <DonatePanel />
          <PartnerPanel email={PARTNER_EMAIL} />
        </div>
      </div>

      <Footer />
    </section>
  );
}

function DonatePanel() {
  return (
    <motion.div
      id="donate"
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.2 }}
      className="flex flex-col gap-6 rounded-3xl border border-[color:var(--color-ink)]/10 bg-white p-8 md:p-10"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ca-blue-deep)]">
          Donate
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.01em] text-[color:var(--color-ink)] md:text-4xl">
          Transfer directly to our partner foundation.
        </h3>
      </div>

      <dl className="grid grid-cols-1 gap-4 rounded-2xl bg-[color:var(--color-ink)]/[0.03] p-6 text-sm sm:grid-cols-2">
        <BankRow label="Account name" value="Ragam Kemanusiaan Indonesia" />
        <BankRow label="Account number" value="800 210 750 800" mono />
        <BankRow label="Bank code" value="008" mono />
        <BankRow label="SWIFT" value="BNIAIDJAXXX" mono />
        <BankRow
          label="Branch"
          value="Canggu Berawa, Jl. Subak Sari No. 11, Tibubeneng, Bali 80361"
          colSpanFull
        />
      </dl>

      <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
        Every contribution funds scholarships, school materials, and community
        programs through Ragam Foundation and Green School Foundation.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button href={`mailto:${PARTNER_EMAIL}?subject=Donation%20to%20Community%20Assist%202026`}>
          Email us your gift
        </Button>
      </div>
    </motion.div>
  );
}

function PartnerPanel({ email }: { email: string }) {
  return (
    <motion.div
      id="partner"
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.3 }}
      className="flex flex-col gap-6 rounded-3xl bg-[color:var(--color-ink)] p-8 text-white md:p-10"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/60">
          Partner with us
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
          Bring your brand alongside the 2026 program.
        </h3>
      </div>

      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-white/80">
        <li>· Title, Premier, and Supporting sponsor tiers</li>
        <li>· In-kind partnerships: venue, F&B, prizes, services</li>
        <li>· Co-branded marketing across our event channels</li>
        <li>· Sponsor a child&rsquo;s full year of education (Rp 6M)</li>
      </ul>

      <div className="flex flex-wrap gap-3">
        <Button
          href={`mailto:${email}?subject=Partnership%20with%20Community%20Assist%202026`}
          variant="ghost"
          className="border-white/25 text-white hover:border-white/60 hover:bg-white/10"
        >
          Start a conversation
        </Button>
      </div>
    </motion.div>
  );
}

function BankRow({
  label,
  value,
  mono,
  colSpanFull,
}: {
  label: string;
  value: string;
  mono?: boolean;
  colSpanFull?: boolean;
}) {
  return (
    <div className={colSpanFull ? "sm:col-span-2" : undefined}>
      <dt className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
        {label}
      </dt>
      <dd
        className={
          "mt-1 text-[color:var(--color-ink)] " +
          (mono ? "font-mono text-[15px] tracking-tight" : "text-[15px]")
        }
      >
        {value}
      </dd>
    </div>
  );
}
