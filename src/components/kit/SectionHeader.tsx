import SplitReveal from "@/components/motion/SplitReveal";
import { display } from "@/components/hero/fonts";

// Shared section opener: numbered mono label, hairline, headline that rises line by line.
export default function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-label uppercase">
        <span>{index}</span>
        <span className="h-px w-10 bg-ink" />
        <span>{label}</span>
      </p>
      <SplitReveal as="h2" className={`${display.className} text-h1 mt-6 max-w-5xl font-medium uppercase`}>
        {title}
      </SplitReveal>
      {intro && <p className="text-body mt-6 max-w-xl">{intro}</p>}
    </div>
  );
}
