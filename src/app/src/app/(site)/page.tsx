import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import ProofNetwork from "@/components/ProofNetwork";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import TechMarquee from "@/components/TechMarquee";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ProofNetwork />
      <RecentBlogPosts />
      <TechMarquee />
      <ExperienceTimeline />
      <TestimonialsMarquee />
      <Faq />
      <Contact />
    </>
  );
}
