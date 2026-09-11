"use client";

import type { ReactNode } from "react";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { Magnetic } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/providers/LocaleProvider";

type Variant = "solid" | "outline" | "outlineInverse" | "ghost" | "inverse";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 t-label transition-colors duration-500";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:text-ink",
  inverse: "bg-paper text-ink hover:text-paper",
  outline: "border border-current text-ink hover:text-paper",
  outlineInverse: "border border-paper/40 text-paper hover:text-ink",
  ghost: "text-current",
};

const fills: Record<Variant, string> = {
  solid: "bg-paper",
  inverse: "bg-ink",
  outline: "bg-ink",
  outlineInverse: "bg-paper",
  ghost: "bg-transparent",
};

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" className={cn("h-2.5 w-6", className)} fill="none" aria-hidden>
      <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  withArrow?: boolean;
  ariaLabel?: string;
}

/** The house CTA: a wipe fill from the leading edge plus a travelling arrow. */
export function ActionLink({
  href,
  children,
  variant = "solid",
  className,
  external,
  magnetic = true,
  withArrow = true,
  ariaLabel,
}: ActionLinkProps) {
  const { isRtl } = useLocale();

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-0 origin-left scale-x-0 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100",
          isRtl && "origin-right",
          fills[variant],
        )}
      />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {withArrow && (
          <Arrow
            className={cn(
              "transition-transform duration-500 group-hover:translate-x-1",
              isRtl && "rotate-180 group-hover:-translate-x-1",
            )}
          />
        )}
      </span>
    </>
  );

  const classes = cn(base, variants[variant], className);

  const link = external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={ariaLabel}
    >
      {inner}
    </a>
  ) : (
    <LocaleLink href={href} className={classes} aria-label={ariaLabel}>
      {inner}
    </LocaleLink>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
