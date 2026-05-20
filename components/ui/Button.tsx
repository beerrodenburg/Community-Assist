import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ca-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-white whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-ca-blue-deep)] active:scale-[0.97]",
  ghost:
    "bg-transparent text-[color:var(--color-ink)] border border-[color:var(--color-ink)]/15 hover:border-[color:var(--color-ink)]/40 hover:bg-black/[0.03] active:scale-[0.97]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm tracking-tight",
  lg: "h-14 px-8 text-base tracking-tight",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type Props = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  ...rest
}: Props) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
