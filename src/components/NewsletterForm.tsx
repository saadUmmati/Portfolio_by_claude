"use client";

import { FaLinkedin } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

// Note: a true one-click "auto-follow" isn't something any browser or LinkedIn
// itself allows -- following a page requires the visitor's own logged-in action,
// by design (a site silently following pages on your behalf on visit would be a
// real privacy problem, which is exactly why platforms block it). This does the
// closest honest equivalent: one click opens your LinkedIn company page directly,
// where they can follow with a single additional click of their own.
export default function NewsletterForm() {
  return (
    <a
      href={site.socials.linkedinCompany}
      target="_blank"
      rel="noreferrer"
      className="cursor-hover flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
    >
      <FaLinkedin size={16} />
      Follow on LinkedIn
      <ArrowUpRight size={14} />
    </a>
  );
}
