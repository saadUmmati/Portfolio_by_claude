"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Clock, RefreshCw } from "lucide-react";
import type { Service } from "@/data/services";
import { site } from "@/data/site";

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [slide, setSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const hasGallery = service.gallery.length > 0;

  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <Link href="/services" className="text-sm text-accent hover:underline">
        ← Back to Services
      </Link>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="text-muted">{service.category}</span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <span className="text-4xl">{service.emoji}</span>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{service.title}</h1>
      </div>
      <p className="mt-4 max-w-2xl text-lg text-muted">{service.longDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {service.tags.map((t) => (
          <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {/* Gallery */}
          {hasGallery && (
            <div>
              <div className="relative h-64 overflow-hidden rounded-2xl border border-border md:h-80">
                {service.gallery[slide]?.src ? (
                  <Image
                    src={service.gallery[slide].src!}
                    alt={service.gallery[slide].label}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    unoptimized
                    className="object-cover"
                    priority={slide === 0}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent/25 via-surface to-accent-2/20 text-center">
                    <span className="text-5xl">{service.emoji}</span>
                    <span className="px-6 text-sm font-medium text-foreground/90">
                      {service.gallery[slide]?.label}
                    </span>
                  </div>
                )}
                {service.gallery.length > 1 && (
                  <>
                    <button
                      aria-label="Previous slide"
                      onClick={() => setSlide((s) => (s - 1 + service.gallery.length) % service.gallery.length)}
                      className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 hover:bg-background"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      aria-label="Next slide"
                      onClick={() => setSlide((s) => (s + 1) % service.gallery.length)}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 hover:bg-background"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs">
                      {slide + 1} / {service.gallery.length}
                    </span>
                  </>
                )}
              </div>
              {service.gallery.length > 1 && (
                <div className="mt-3 flex gap-3">
                  {service.gallery.map((g, i) => (
                    <button
                      key={g.label}
                      onClick={() => setSlide(i)}
                      title={g.label}
                      className={`relative h-16 flex-1 overflow-hidden rounded-lg border ${
                        slide === i ? "border-accent" : "border-border"
                      }`}
                    >
                      {g.src ? (
                        <Image src={g.src} alt={g.label} fill sizes="150px" unoptimized className="object-cover" />
                      ) : (
                        <span className="flex h-full items-center justify-center px-1 text-center text-xs text-muted">
                          {g.label}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* What's included */}
          <div className={hasGallery ? "mt-10" : ""}>
            <h2 className="text-xl font-semibold">What&apos;s Included</h2>
            <ul className="mt-4 space-y-3">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-4 divide-y divide-border border-t border-b border-border">
              {service.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.question}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="cursor-hover flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium"
                    >
                      {f.question}
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && <p className="pb-4 text-sm text-muted">{f.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="h-fit rounded-2xl border border-border bg-surface p-6">
          <p className="text-xs text-muted">Pricing</p>
          <p className="mt-1 text-2xl font-semibold">Custom Quote</p>
          <p className="mt-1 text-sm text-muted">
            Every project&apos;s scope is different — let&apos;s talk about yours on a quick call.
          </p>

          <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            {service.deliveryDays > 0 ? (
              <div className="flex items-center gap-2 text-muted">
                <Clock size={15} />
                Typical delivery: {service.deliveryDays} days
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted">
                <Clock size={15} />
                Ongoing engagement
              </div>
            )}
            <div className="flex items-center gap-2 text-muted">
              <RefreshCw size={15} />
              {service.revisions}
            </div>
          </div>

          <Link
            href="/schedule"
            className="cursor-hover mt-6 block rounded-full bg-accent px-4 py-3 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Book a Call
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="cursor-hover mt-3 block rounded-full border border-border px-4 py-3 text-center text-sm font-medium transition-colors hover:border-accent"
          >
            Contact for Project
          </a>
        </div>
      </div>
    </div>
  );
}
