"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { brand, whatsappHref } from "@/data/brand";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactBody() {
  const { dict, locale } = useLocale();
  const c = dict.contact;
  const [status, setStatus] = useState<Status>("idle");

  const message =
    locale === "ar"
      ? "مرحبًا A&K Brand، أود الاستفسار عن منتجاتكم."
      : "Hello A&K Brand, I'd like to enquire about your products.";

  const channels = [
    { key: "phone", label: c.phoneLabel, value: brand.contact.phone.value, href: brand.contact.phone.href, placeholder: brand.contact.phone.placeholder },
    { key: "whatsapp", label: c.whatsappLabel, value: brand.contact.whatsapp.value, href: whatsappHref(message), placeholder: brand.contact.whatsapp.placeholder, external: true },
    { key: "email", label: c.emailLabel, value: brand.contact.email.value, href: brand.contact.email.href, placeholder: brand.contact.email.placeholder },
    { key: "wholesale", label: "B2B", value: brand.contact.wholesaleEmail.value, href: brand.contact.wholesaleEmail.href, placeholder: brand.contact.wholesaleEmail.placeholder },
    { key: "address", label: c.addressLabel, value: brand.contact.address[locale], placeholder: brand.contact.address.placeholder },
    { key: "hours", label: c.hoursLabel, value: brand.contact.hours[locale], placeholder: brand.contact.hours.placeholder },
  ];

  /**
   * Front-end only. `onSubmit` is the single seam to replace with a server
   * action, an API route or a form provider — nothing else needs to change.
   */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 550));
    setStatus("sent");
    form.reset();
  };

  const fieldClass =
    "t-body w-full border-b border-ink/20 bg-transparent py-3 text-sm outline-none transition-colors duration-300 placeholder:text-ink/60 focus:border-clay";

  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <p className="t-body mb-12 max-w-2xl border-s-2 border-clay ps-5 text-xs text-ink/60">
          {c.placeholderNotice}
        </p>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Channels */}
          <div className="lg:col-span-5">
            <SectionMeta index="01" label={c.eyebrow} />

            <dl className="mt-8">
              <div className="border-t border-ink/15 py-5">
                <dt className="t-label mb-2 text-ink/60">{c.companyLabel}</dt>
                <dd className="t-heading text-lg">{c.companyValue}</dd>
              </div>
              <div className="border-t border-ink/15 py-5">
                <dt className="t-label mb-2 text-ink/60">{c.chairmanLabel}</dt>
                <dd className="t-heading text-lg">
                  {dict.chairman.honorific} {dict.chairman.name}
                </dd>
              </div>

              {channels.map((channel) => (
                <div key={channel.key} className="border-t border-ink/15 py-5">
                  <dt className="t-label mb-2 text-ink/60">{channel.label}</dt>
                  <dd className="flex flex-wrap items-baseline gap-3">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noopener noreferrer" : undefined}
                        className="t-body link-rule text-ink hover:text-clay-deep"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span className="t-body text-ink">{channel.value}</span>
                    )}
                    {channel.placeholder && (
                      <span className="t-label rounded-full border border-ink/15 px-2 py-0.5 text-[0.5625rem] text-ink/60">
                        {locale === "ar" ? "مبدئي" : "placeholder"}
                      </span>
                    )}
                  </dd>
                </div>
              ))}

              <div className="border-y border-ink/15 py-5">
                <dt className="t-label mb-3 text-ink/60">{c.socialLabel}</dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2">
                  {brand.social.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-label link-rule text-ink/70 hover:text-clay-deep"
                    >
                      {item.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Enquiry */}
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionMeta index="02" label={c.formTitle} />

            <Reveal className="mt-8">
              <form onSubmit={onSubmit} noValidate className="space-y-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="t-label mb-1 block text-ink/60">
                      {c.form.name} <span className="text-clay-deep">*</span>
                    </label>
                    <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="t-label mb-1 block text-ink/60">
                      {c.form.email} <span className="text-clay-deep">*</span>
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
                  </div>
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="t-label mb-1 block text-ink/60">
                      {c.form.company}
                    </label>
                    <input id="company" name="company" type="text" autoComplete="organization" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="subject" className="t-label mb-1 block text-ink/60">
                      {c.form.subject}
                    </label>
                    <select id="subject" name="subject" className={cn(fieldClass, "appearance-none")}>
                      {c.form.subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="t-label mb-1 block text-ink/60">
                    {c.form.message} <span className="text-clay-deep">*</span>
                  </label>
                  <textarea id="message" name="message" rows={5} required className={cn(fieldClass, "resize-y")} />
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative overflow-hidden border border-ink bg-ink px-8 py-4 text-paper transition-colors duration-500 hover:text-ink disabled:opacity-60"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-paper transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rtl:origin-right"
                    />
                    <span className="t-label relative z-10">
                      {status === "sending" ? c.form.sending : c.form.submit}
                    </span>
                  </button>

                  <div aria-live="polite" className="min-h-5">
                    {status === "sent" && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="t-label max-w-xs text-clay-deep"
                      >
                        {c.form.success}
                      </motion.p>
                    )}
                    {status === "error" && (
                      <p className="t-label max-w-xs text-clay-deep">{c.form.error}</p>
                    )}
                  </div>
                </div>

                <p className="t-body border-t border-ink/12 pt-4 text-xs text-ink/60">{c.formNote}</p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
