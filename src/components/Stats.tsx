import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

export default function Stats() {
  return (
    <section>
      <div className="container-page grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 py-10 sm:py-12 md:py-14 lg:grid-cols-5">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center md:text-left">
            <div className="text-3xl font-semibold md:text-4xl">
              {"target" in s ? (
                <CountUp target={s.target} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
              ) : (
                s.value
              )}
            </div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
