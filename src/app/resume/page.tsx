import type { Metadata } from "next";
import Link from "next/link";
import { getResumeUrl } from "@/sanity/resume";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Resume - ${site.name}`,
  robots: { index: false, follow: false },
};

export const revalidate = 3600; // picks up a new PDF uploaded in /studio within the hour

// Full-screen resume: no navbar, no footer, just the document and two small controls.
// (Phones often show only page 1 of an embedded PDF, so "Open PDF" is always there.)
export default async function ResumePage() {
  const url = await getResumeUrl();
  return (
    <main className="fixed inset-0 bg-black">
      <iframe
        src={`${url}#toolbar=0&navpanes=0&view=FitH`}
        title={`${site.name} - resume`}
        className="h-full w-full border-0"
      />
      <div className="absolute top-4 right-4 flex gap-2 font-mono text-xs tracking-[0.08em] uppercase">
        <a href={url} target="_blank" rel="noreferrer" className="border border-paper bg-black px-4 py-2.5 text-paper">
          Open PDF
        </a>
        <a href={url} download className="border border-paper bg-black px-4 py-2.5 text-paper">
          Download
        </a>
        <Link href="/" className="bg-accent px-4 py-2.5 text-on-accent">
          Close
        </Link>
      </div>
    </main>
  );
}
