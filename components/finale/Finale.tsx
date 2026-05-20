"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Footer } from "./Footer";

const PARTNER_EMAIL = "communityassist@indosole.com";
const PARTNER_SUBJECT = "Partnership with Community Assist 2026";
const PARTNER_BODY = `Hi Community Assist team,

I'd love to learn more about partnering with you for the 2026 program.

A bit about us:
· Company / brand:
· What we're interested in (sponsor tier, sponsoring a child, custom):
· Anything else you should know:

Looking forward to hearing from you.`;

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
          <span className="italic font-light text-[color:var(--color-ca-blue)]">
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
      className="flex flex-col gap-8 rounded-3xl bg-[#c8d9e6] p-8 md:p-10"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ca-blue-deep)]">
          Donate
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.01em] text-[color:var(--color-ink)] md:text-4xl">
          Transfer directly to our{" "}
          <span className="italic font-light text-[color:var(--color-ca-blue-deep)]">
            partner foundation.
          </span>
        </h3>
      </div>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-2xl bg-[#b6cbdc] p-6 text-sm sm:grid-cols-2">
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

      <p className="text-sm leading-relaxed text-[color:var(--color-ink)]/70">
        Every contribution funds scholarships, school materials, and a
        dedicated community manager through Ragam Foundation&rsquo;s
        Educational Scholarship Program.
      </p>
    </motion.div>
  );
}

function PartnerPanel({ email }: { email: string }) {
  return (
    <motion.div
      id="partner"
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.3 }}
      className="flex flex-col gap-8 rounded-3xl bg-[#e2cad8] p-8 md:p-10"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ca-pink-deep)]">
          Partner with us
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.01em] text-[color:var(--color-ink)] md:text-4xl">
          Bring your brand alongside the{" "}
          <span className="italic font-light text-[color:var(--color-ca-pink-deep)]">
            2026 program.
          </span>
        </h3>
      </div>

      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-[color:var(--color-ink)]/85">
        <PartnerRow>
          Community, Game Changer, and Champion sponsor tiers (Rp 20M&ndash;120M)
        </PartnerRow>
        <PartnerRow>In-kind partnerships: venue, prizes, and services</PartnerRow>
        <PartnerRow>Co-branded marketing across our event channels</PartnerRow>
        <PartnerRow>
          Sponsor a child&rsquo;s full year of education (Rp 6M)
        </PartnerRow>
      </ul>

      <p className="text-sm leading-relaxed text-[color:var(--color-ink)]/70">
        Custom packages welcome — let&rsquo;s design one together.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          href={`mailto:${email}?subject=${encodeURIComponent(PARTNER_SUBJECT)}&body=${encodeURIComponent(PARTNER_BODY)}`}
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
      <dt className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ink)]/55">
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

function PartnerRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-[0.55em] block h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--color-ca-pink-deep)]"
      />
      <span>{children}</span>
    </li>
  );
}
