import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "AI agents, on-device AI, mobile, web, and consulting services.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
