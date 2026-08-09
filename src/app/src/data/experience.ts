export type ExperienceCategory =
  | "AI"
  | "Mobile Apps"
  | "Websites"
  | "ChatBots"
  | "Content Creation"
  | "Consultations";

export interface GalleryImage {
  label: string;
  src?: string; // real screenshot path -- falls back to a gradient placeholder tile if omitted
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string; // link for the "Visit Company" button, omit if none yet
  logoSrc?: string; // real logo image URL -- falls back to the letter badge if omitted
  logoBg?: "light" | "dark"; // "dark" for logos that are white/light and invisible on a white badge
  location: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  categories: ExperienceCategory[];
  logoInitial: string; // fallback letter logo when logoSrc isn't set
  logoColor: string; // background color for the letter/logo badge
  gallery: GalleryImage[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "hashdev",
    company: "HashDev Solutions",
    companyUrl: "https://hashdevsol.com",
    logoSrc: "/images/hashdev-logo.png",
    logoBg: "dark",
    location: "Onsite",
    role: "AI Automation Engineer",
    period: "July 2026 - Present",
    description:
      "Building AI automation systems and workflow integrations as an AI Automation Engineer, onsite.",
    tags: ["AI Automation", "Workflow Automation", "AI Agents"],
    categories: ["AI", "Consultations"],
    logoInitial: "H",
    logoColor: "#F97316",
    gallery: [
      { label: "Agent tool-calling diagram", src: "/images/gallery/agent-tool-calling-diagram.png" },
      { label: "n8n workflow diagram", src: "/images/gallery/n8n-workflow-diagram.png" },
      { label: "Model pipeline diagram", src: "/images/gallery/model-pipeline-diagram.png" },
      { label: "Architecture review notes", src: "/images/gallery/architecture-review-notes.png" },
    ],
  },
  {
    id: "cloudgate",
    company: "CloudGate Technologies",
    companyUrl: "https://www.cloudgatetechnologies.com",
    logoSrc: "https://www.cloudgatetechnologies.com/assets/images/logo/logo2.png",
    location: "Onsite",
    role: "On-Device AI Engineer & Android Developer",
    period: "March 2026 - July 2026",
    description:
      "Embedding AI solutions directly into mobile applications: researching a hybrid ARCore + Depth Anything V2 (ONNX) measurement feature, building ClipGallery — an on-device gallery app with DINOv2-based semantic clustering — and shipping Melodix, a full Kotlin/XML music player with MediaSession, a foreground service, and notification controls.",
    tags: ["On-Device AI", "ONNX", "Android", "Kotlin", "ARCore", "MVVM"],
    categories: ["AI", "Mobile Apps"],
    logoInitial: "C",
    logoColor: "#6d5bff",
    gallery: [
      { label: "ClipGallery clustering UI", src: "/images/gallery/clipgallery-clustering-ui.png" },
      { label: "AR measurement prototype", src: "/images/gallery/ar-measurement-prototype.png" },
      { label: "Melodix player screen", src: "/images/gallery/melodix-player-screen.png" },
    ],
  },
  {
    id: "shs-creators",
    company: "SHS Creators",
    companyUrl: "https://shscreators.com",
    logoSrc: "https://shscreators.com/logo.svg",
    location: "Onsite",
    role: "Co-Founder & COO",
    period: "2025 - 2026",
    description:
      "Co-founded and help operate SHS Creators, an AI automation & digital marketing agency — overseeing product direction, AI chatbot and workflow automation delivery, and day-to-day operations.",
    tags: ["Leadership", "AI Agents", "Automation", "Operations"],
    categories: ["Consultations", "AI"],
    logoInitial: "S",
    logoColor: "#7C3AED",
    logoBg: "dark",
    gallery: [
      { label: "Team workspace", src: "/images/gallery/team-workspace.png" },
      { label: "Product roadmap snapshot", src: "/images/gallery/product-roadmap-snapshot.png" },
    ],
  },
  {
    id: "naano",
    company: "Naano",
    companyUrl: "https://www.naano.xyz",
    logoSrc: "https://www.naano.xyz/lp/naano-logomark.png",
    location: "Remote",
    role: "LinkedIn Creator",
    period: "June 2026 - Present",
    description:
      "Active creator on Naano, a B2B LinkedIn creator marketplace — partnering with B2B SaaS brands on sponsored LinkedIn content, with clicks, leads, and pipeline tracked back to each post.",
    tags: ["LinkedIn", "Content Creation", "B2B Marketing"],
    categories: ["Content Creation"],
    logoInitial: "N",
    logoColor: "#0EA5E9",
    gallery: [
      { label: "Campaign performance snapshot", src: "/images/gallery/campaign-performance-snapshot.png" },
      { label: "Published post example", src: "/images/gallery/published-post-example.png" },
    ],
  },
  {
    id: "optiexperts",
    company: "OptiExperts",
    companyUrl: "https://optiexperts.com",
    logoSrc: "https://optiexperts.co.uk/cdn/shop/files/Footer_Logo_medium.png",
    logoBg: "dark",
    location: "Remote",
    role: "Front-End Developer (Intern)",
    period: "September 2024 - March 2025",
    description:
      "Front-end development internship at a UK-based Shopify Plus agency, working on e-commerce storefronts.",
    tags: ["Shopify", "Front-End", "E-commerce"],
    categories: ["Websites"],
    logoInitial: "O",
    logoColor: "#22c55e",
    gallery: [
      { label: "Storefront redesign", src: "/images/gallery/storefront-redesign.png" },
      { label: "Shopify theme customization", src: "/images/gallery/shopify-theme-customization.png" },
    ],
  },
];

export const experienceFilters: ("All" | ExperienceCategory)[] = [
  "All",
  "AI",
  "Mobile Apps",
  "Websites",
  "ChatBots",
  "Content Creation",
  "Consultations",
];
