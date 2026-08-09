import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.title}`,
    template: `%s - ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "On-Device AI Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "AI Agents",
    "Automation Engineer",
    "Android Developer",
    "LLM Engineer",
    site.name,
  ],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} - ${site.title}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/images/profile-photo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.title}`,
    description: site.tagline,
    images: ["/images/profile-photo.jpg"],
  },
  icons: {
    icon: "/images/profile-image.jpg",
    shortcut: "/images/profile-image.jpg",
    apple: "/images/profile-image.jpg",
  },
};

// Structured data (schema.org Person) -- helps search engines understand who this
// site belongs to and can power a knowledge-panel-style rich result for name searches.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.title,
  description: site.tagline,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: [site.socials.linkedin, site.socials.github].filter(Boolean),
  knowsAbout: site.about.specialties,
};

// Runs before hydration to avoid a light/dark flash on load.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body id="top" className="min-h-full flex flex-col text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
