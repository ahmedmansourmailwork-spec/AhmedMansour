"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * A thin ring that trails the pointer and swells over interactive elements.
 * Mounts only for fine pointers, so it costs touch devices nothing. The native
 * cursor is never hidden — hiding it breaks too many things for too little.
 */
export function CursorHalo() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='grow'], input, textarea, select")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full border border-clay mix-blend-difference"
        animate={{
          width: active ? 46 : 22,
          height: active ? 46 : 22,
          opacity: visible ? (active ? 0.9 : 0.55) : 0,
          margin: active ? -23 : -11,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
