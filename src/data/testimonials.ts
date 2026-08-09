import { FaLinkedin, FaGoogle } from "react-icons/fa6";
import { SiUpwork, SiFiverr } from "react-icons/si";
import type { LinkIcon } from "./misc";

export type TestimonialPlatform = "LinkedIn" | "Upwork" | "Fiverr" | "Google" | "Client";

export const platformIcons: Record<TestimonialPlatform, LinkIcon | null> = {
  LinkedIn: FaLinkedin,
  Upwork: SiUpwork,
  Fiverr: SiFiverr,
  Google: FaGoogle,
  Client: null,
};

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  platform: TestimonialPlatform;
  quote: string;
  initials: string;
  rating: number;
}

// Example-style testimonials in the meantime -- swap in real client quotes once you
// have them. Ratings/companies are illustrative, matching the tone of AI/automation
// client feedback you'll actually collect.
export const testimonials: Testimonial[] = [
  {
    name: "Sarah Khan",
    role: "Founder",
    company: "BrightLeads",
    platform: "LinkedIn",
    quote:
      "We were manually qualifying every inbound lead before this. Saad mapped our whole intake process and rebuilt it as an automated pipeline in about three weeks — scoring, routing, and CRM sync all handled without anyone touching it. Our response time to hot leads went from hours to minutes.",
    initials: "SK",
    rating: 5,
  },
  {
    name: "Daniel Mehta",
    role: "CEO",
    company: "NovaCommerce",
    platform: "Upwork",
    quote:
      "The support chatbot now handles roughly 70% of our tickets on its own, and it actually escalates the right ones instead of dumping everything on the team. What stood out was the documentation — I could hand it to a new hire and they'd understand the whole system in an afternoon.",
    initials: "DM",
    rating: 5,
  },
  {
    name: "Aisha Raza",
    role: "Ops Lead",
    company: "FinTrack",
    platform: "Fiverr",
    quote:
      "Our on-device clustering pipeline kept breaking on edge cases before we brought Saad in. He rebuilt the model side and the deployment side, and it's been running clean since. Fast turnaround, and he flagged two data issues on our end we hadn't even noticed.",
    initials: "AR",
    rating: 5,
  },
  {
    name: "Omar Siddiqui",
    role: "Director",
    company: "ScaleHub",
    platform: "Client",
    quote:
      "Clear communication from kickoff to handoff, which isn't something I take for granted with contract engineers. The automation he built has run untouched for months now. We've since brought him back for a second project.",
    initials: "OS",
    rating: 5,
  },
  {
    name: "Lena Fischer",
    role: "Marketing Head",
    company: "Vireo",
    platform: "Google",
    quote:
      "The content automation API cut our publishing workflow down significantly. It took a little longer than the original estimate to get the tone right across channels, but the end result was worth the extra round of feedback.",
    initials: "LF",
    rating: 4,
  },
  {
    name: "Hamza Ali",
    role: "Owner",
    company: "HN Foods",
    platform: "LinkedIn",
    quote:
      "We went from paper order slips to a proper app with automated order routing in under two months. Saad walked our staff through it personally, which made the rollout painless. Customers keep commenting on how smooth the ordering feels now.",
    initials: "HA",
    rating: 5,
  },
  {
    name: "Zara Malik",
    role: "Product Manager",
    company: "Kindred Labs",
    platform: "Upwork",
    quote:
      "We assumed the on-device AI feature we wanted would need a full backend and a much bigger budget. Saad proposed running it entirely on-device instead, which cut both our infra costs and latency to near zero. That kind of judgment call is worth more than the code itself.",
    initials: "ZM",
    rating: 5,
  },
  {
    name: "Yusuf Karim",
    role: "CTO",
    company: "Northline Systems",
    platform: "Client",
    quote:
      "Brought Saad in for a code and architecture review before a big scaling push. He caught two bottlenecks we'd have hit hard in production and proposed fixes that took a day to implement instead of a rewrite. Sharp, direct, and worth every hour.",
    initials: "YK",
    rating: 5,
  },
];
