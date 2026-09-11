"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: ReactNode;
  /** Seconds for one full pass. Longer = calmer. */
  duration?: number;
  pauseOnHover?: boolean;
}

/**
 * CSS-driven marquee — no rAF, no layout thrash, and frozen entirely under
 * prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator,
  duration = 44,
  pauseOnHover = true,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const sequence = [...items, ...items];

  return (
    <div
      className={cn("relative flex overflow-hidden", paused && "marquee-paused", className)}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      aria-hidden
    >
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
            {item}
            <span className="mx-[0.6em] inline-block opacity-45" aria-hidden>
              {separator ?? "·"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
