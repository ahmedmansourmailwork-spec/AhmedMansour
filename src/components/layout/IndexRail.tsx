"use client";

import { useEffect, useState } from "react";
import { homeSections } from "@/data/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * The spine of the publication: a vertical index of every spread on the page.
 * Rendered in difference blend mode so it stays legible over ink, paper and
 * photography alike without any per-section configuration.
 */
export function IndexRail() {
  const { dict } = useLocale();
  const [active, setActive] = useState<string>(homeSections[0].id);

  useEffect(() => {
    const targets = homeSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label={dict.common.index}
      className="pointer-events-none fixed inset-y-0 start-0 z-[70] hidden w-[var(--rail-w)] select-none py-24 mix-blend-difference lg:flex lg:flex-col lg:items-center"
    >
      <ul className="pointer-events-auto my-auto flex flex-col items-center gap-3">
        {homeSections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-5 items-center gap-2"
              >
                <span
                  className={cn(
                    "t-num block text-[0.5625rem] tracking-[0.14em] text-paper transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-35 group-hover:opacity-80",
                  )}
                >
                  {section.num}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block h-px bg-paper transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "w-4 opacity-100" : "w-1.5 opacity-30 group-hover:w-3",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>

      {/* Colophon — dropped on short viewports so it never meets the index. */}
      <span
        aria-hidden
        className="t-label hidden shrink-0 whitespace-nowrap text-[0.5625rem] text-paper opacity-40 [writing-mode:vertical-rl] rtl:[writing-mode:vertical-lr] [@media(min-height:820px)]:block"
      >
        {dict.footer.tagline1}
      </span>
    </aside>
  );
}
