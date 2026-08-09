import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { meetingTypes } from "@/data/meetings";
import ScheduleEmbed from "@/components/ScheduleEmbed";

export function generateStaticParams() {
  return meetingTypes.filter((m) => m.active).map((m) => ({ slug: m.slug }));
}

export default async function MeetingTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meeting = meetingTypes.find((m) => m.slug === slug && m.active);
  if (!meeting) notFound();

  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <Link href="/schedule" className="cursor-hover flex w-fit items-center gap-1.5 text-sm text-accent hover:underline">
        <ArrowLeft size={14} />
        Back to Schedule
      </Link>

      <span className="mt-6 flex w-fit items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
        <Clock size={11} />
        {meeting.duration}
      </span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {meeting.title}
      </h1>
      <p className="mt-2 max-w-xl text-muted">{meeting.description}</p>

      <div className="mt-8">
        <ScheduleEmbed />
      </div>
    </div>
  );
}
