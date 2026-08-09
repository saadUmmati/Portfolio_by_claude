"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/misc";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 py-12 sm:py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-accent/15 py-14">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-page relative">
          <h2 className="text-center text-6xl font-black tracking-tight sm:text-8xl">
            FAQ&apos;S
          </h2>

          <div className="mx-auto mt-14 max-w-3xl">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={f.question} className="border-t border-border last:border-b">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="cursor-hover flex w-full items-center gap-4 py-5 text-left sm:gap-6"
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-medium sm:text-lg">
                      {f.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 transition-transform duration-200 ${
                        isOpen ? "-rotate-180 bg-accent/15" : ""
                      }`}
                    >
                      <ChevronDown size={15} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden pl-9 text-sm text-muted sm:pl-11">
                      {f.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
