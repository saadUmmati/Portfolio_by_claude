import Hero3D from "@/components/hero/Hero3D";
import HeroIntro from "@/components/hero/HeroIntro";
import ProjectCarousel from "@/components/ProjectCarousel";

// Home page opening: 3D hero -> violet statement -> project showcase (rebuilt in a later phase).
export default function Hero() {
  return (
    <>
      <Hero3D />
      <HeroIntro />
      <section className="container-page flex flex-col items-center gap-8 py-16 md:py-24">
        <p className="self-start font-mono text-label uppercase">Selected work</p>
        <ProjectCarousel />
      </section>
    </>
  );
}
