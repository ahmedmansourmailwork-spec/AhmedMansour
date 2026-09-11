"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

export function Counter({
  to,
  duration = 1600,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const { locale } = useLocale();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Same easing curve as the rest of the site.
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduced]);

  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(value);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
