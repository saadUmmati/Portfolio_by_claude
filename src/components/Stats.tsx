import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { display } from "@/components/hero/fonts";

export default function Stats() {
  const last = site.stats.length - 1;
  return (
    <section aria-label="Key numbers" className="border-t border-ink">
      <div className="container-page">
        <div className="grid grid-cols-2 border-ink sm:grid-cols-3 lg:grid-cols-5 [&>*]:border-b [&>*]:border-l [&>*]:border-ink lg:border-r">
          {site.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={i === last ? "bg-accent text-on-accent" : ""}
            >
              <div className="px-5 py-8 md:px-7 md:py-12">
                <div className={`${display.className} text-[clamp(1.7rem,2.9vw,2.9rem)] leading-none font-medium tabular-nums`}>
                  {"target" in s ? (
                    <CountUp target={s.target} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                  ) : (
                    s.value
                  )}
                </div>
                <div className="mt-4 font-mono text-label uppercase">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
