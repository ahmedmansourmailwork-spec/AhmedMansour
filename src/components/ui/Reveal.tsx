"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Direction the content travels in from. "side" respects RTL. */
  from?: "up" | "down" | "side" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  from = "up",
  distance = 28,
  duration = 0.9,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();
  const { flip } = useLocale();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const offset =
    from === "up"
      ? { y: distance }
      : from === "down"
        ? { y: -distance }
        : from === "side"
          ? { x: distance * flip }
          : {};

  const variants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, ...offset },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduced ? 0.2 : duration, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

/** Clip-path image reveal — the frame opens, the image settles back to scale 1. */
export function RevealFrame({
  children,
  className,
  delay = 0,
  duration = 1.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: duration + 0.5, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
