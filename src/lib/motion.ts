// Motion spec -- the ONLY place durations, easings and distances are defined.
// Rule: max 3 easings, one duration scale, one distance scale. Everything animates from these.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}
registerGsap(); // importing this file on the client registers the plugins

export const ease = {
  out: "power3.out",      // UI reveals, hovers
  inOut: "power3.inOut",  // transitions between states
  impact: "expo.out",     // hero / signature moments only
} as const;

export const dur = { fast: 0.3, base: 0.6, slow: 1.0, hero: 1.4 } as const; // seconds
export const dist = { sm: 12, md: 24, lg: 48 } as const;                    // px
export const stagger = { tight: 0.04, base: 0.08 } as const;                // seconds

export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_QUERY).matches;
}
