import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "./globals.css";

/**
 * Root-level fallback. The locale layout owns <html> for every real route, so
 * this branch — reached only by requests the middleware cannot localise —
 * supplies its own document shell.
 */
export default function RootNotFound() {
  const dict = getDictionary(defaultLocale);
  const n = dict.notFound;

  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="bg-ink text-paper antialiased">
        <main className="flex min-h-screen flex-col justify-center px-6 sm:px-12">
          <p className="t-num t-label text-clay-soft">{n.code}</p>
          <h1 className="t-display fs-xxl mt-6 max-w-[14ch]">
            {n.title} <span className="t-serif text-clay-soft">{n.titleAccent}</span>
          </h1>
          <p className="t-body mt-6 max-w-md text-paper/65">{n.body}</p>
          <Link
            href={`/${defaultLocale}`}
            className="t-label mt-8 inline-block w-fit bg-paper px-7 py-4 text-ink transition-colors hover:bg-clay hover:text-paper"
          >
            {n.cta}
          </Link>
        </main>
      </body>
    </html>
  );
}
