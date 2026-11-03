import Hero3D from "@/components/hero/Hero3D";
import HeroIntro from "@/components/hero/HeroIntro";
import Work from "@/components/Work";

// Home page opening: 3D hero -> violet statement -> selected work.
export default function Hero() {
  return (
    <>
      <Hero3D />
      <HeroIntro />
      <Work />
    </>
  );
}
