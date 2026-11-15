import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import ProofNetwork from "@/components/ProofNetwork";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import TechMarquee from "@/components/TechMarquee";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Testimonials from "@/components/Testimonials";
import ClosingCta from "@/components/ClosingCta";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { getResumeUrl } from "@/sanity/resume";

export default async function Home() {
  const resumeUrl = await getResumeUrl();
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ProofNetwork />
      <RecentBlogPosts />
      <TechMarquee />
      <ExperienceTimeline />
      <Testimonials />
      <Faq />
      <ClosingCta />
      <Contact resumeUrl={resumeUrl} />
    </>
  );
}
