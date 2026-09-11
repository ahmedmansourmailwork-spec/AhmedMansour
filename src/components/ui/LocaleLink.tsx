"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

type Props = Omit<LinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    children: ReactNode;
  };

/** next/link with the active locale segment prefixed automatically. */
export function LocaleLink({ href, children, ...rest }: Props) {
  const { locale } = useLocale();
  const resolved = href.startsWith("/") ? `/${locale}${href === "/" ? "" : href}` : href;
  return (
    <Link href={resolved} {...rest}>
      {children}
    </Link>
  );
}
