"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { cn, toWords } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Extra element appended after the words — used for the italic accent. */
  accent?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Word-by-word mask reveal. Each word sits in an overflow-hidden box and rises
 * into place, which keeps descenders intact — the usual failure of this effect.
 */
export function RevealText({
  text,
  as = "span",
  className,
  accent,
  accentClassName,
  delay = 0,
  stagger = 0.055,
  once = true,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const Tag = as as ElementType;
  const words = toWords(text);
  const accentWords = accent ? toWords(accent) : [];

  if (reduced) {
    return (
      <Tag className={className}>
        {text}
        {accent ? <span className={cn("ms-[0.25em]", accentClassName)}>{accent}</span> : null}
      </Tag>
    );
  }

  const all = [
    ...words.map((w) => ({ word: w, isAccent: false })),
    ...accentWords.map((w) => ({ word: w, isAccent: true })),
  ];

  return (
    <Tag className={className}>
      <span className="sr-only">{accent ? `${text} ${accent}` : text}</span>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        whileInView="shown"
        viewport={{ once, amount: 0.4 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {all.map((item, i) => (
          <span
            key={`${item.word}-${i}`}
            className={cn(
              "mask-line inline-block overflow-hidden align-bottom",
              i < all.length - 1 && "me-[0.2em]",
            )}
          >
            <motion.span
              className={cn("inline-block", item.isAccent && accentClassName)}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                shown: { y: "0%", opacity: 1, transition: { duration: 0.95, ease: EASE } },
              }}
            >
              {item.word}
              {i < all.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
