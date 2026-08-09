import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Star,
  CalendarDays,
  MessageCircle,
  Mail,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { site } from "./site";
import type { ComponentType } from "react";

export type LinkIcon = ComponentType<{ size?: number; className?: string }>;

export const techStack: string[][] = [
  ["Kotlin", "Android", "MVVM", "XML", "Jetpack", "WorkManager", "Hilt", "Room"],
  [
    "ONNX",
    "DINOv2",
    "CLIP",
    "TensorFlow Lite",
    "Python",
    "PyTorch",
    "Machine Learning",
    "Computer Vision",
  ],
  [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Firebase",
    "REST APIs",
    "Git",
  ],
];

export const faqs = [
  {
    question: "Do you build on-device AI features, not just cloud-based AI?",
    answer:
      "Yes — my focus is on-device AI: running quantized ONNX models directly on Android for clustering, semantic search, and classification without server round-trips.",
  },
  {
    question: "Can you build a full Android app from scratch?",
    answer:
      "Yes, I build native Android apps in Kotlin with MVVM architecture, from initial screens through Play Store submission.",
  },
  {
    question: "Do you also do full-stack web development?",
    answer:
      "Yes — I work across React/Next.js frontends and Node.js/API backends, particularly for AI-integrated products, and I handle both frontend and backend rather than just one side.",
  },
  {
    question: "Can you build AI-powered chatbots and automation systems?",
    answer:
      "Yes — this is a core part of my work. I build RAG-based chatbots, LLM-powered agents, and workflow automation (n8n, API integrations) that connect your tools and cut out repetitive manual work.",
  },
  {
    question: "What certifications do you hold?",
    answer:
      "Five: Google Professional ML Engineer, AWS ML Specialty, AWS Certified DevOps Engineer – Professional, the National Financial Literacy Program for Youth (NIBAF), and Create a Website Using WordPress (Coursera).",
  },
  {
    question: "Are you available for full-time roles?",
    answer:
      "Yes, I'm actively open to full-time remote AI/ML Engineering roles (US, UK, EU focus) as well as freelance/contract work.",
  },
  {
    question: "Do you offer training or educational content creation services?",
    answer:
      "Yes — alongside development, I create educational content on AI and tech (10,000+ LinkedIn followers) and I'm open to structured training or mentoring engagements for teams.",
  },
  {
    question: "What payment systems and e-commerce solutions do you implement?",
    answer:
      "I've integrated e-commerce and payment flows as part of full-stack builds, including a virtual try-on system in a live MERN store. Tell me your platform (Shopify, custom, etc.) and I can scope the right approach.",
  },
  {
    question: "Which cloud platforms and databases do you work with?",
    answer:
      "AWS and Google Cloud on the platform side (backed by my AWS certifications), and Firebase, MongoDB, PostgreSQL, and SQLite on the database side, depending on what the project needs.",
  },
  {
    question: "What is your experience level and track record on freelancing platforms?",
    answer:
      "I've delivered client work through Upwork and Fiverr alongside direct freelance engagements, spanning on-device AI, Android apps, and automation systems.",
  },
  {
    question: "Can you help with technical mentoring or code reviews?",
    answer:
      "Yes — I offer this directly through the Career & Job Search Mentorship and Code Review options on the Schedule page.",
  },
  {
    question: "Are you available for in-person meetings or consultations?",
    answer:
      "I'm based in Wah Cantt, Pakistan, and open to in-person meetings locally when practical. For everyone else, all consultations are available over video call.",
  },
  {
    question: "What makes your development approach different from other developers?",
    answer:
      "I specialize specifically in on-device AI — most developers bolt AI onto a backend; I optimize models to run directly on the device, which means faster, more private, offline-capable features most teams don't know how to build.",
  },
];


export interface QuickLink {
  label: string;
  description?: string;
  href: string;
  Icon: LinkIcon;
  external?: boolean;
}

export const linksPage = {
  intro: "All my links in one place — explore the site, book a call, or reach out directly.",
  groups: [
    {
      heading: "Explore",
      items: [
        { label: "Home", description: "Portfolio overview", href: "/", Icon: Home },
        { label: "About Me", description: "My background & specialties", href: "/#about", Icon: User },
        { label: "Services", description: "What I can build for you", href: "/services", Icon: Briefcase },
        { label: "Work Experience", description: "My professional journey", href: "/#experience", Icon: Sparkles },
        { label: "Blog", description: "Writing on AI & mobile dev", href: "/blog", Icon: BookOpen },
        { label: "Testimonials", description: "What clients say", href: "/testimonials", Icon: Star },
        { label: "FAQ", description: "Common questions answered", href: "/#faq", Icon: HelpCircle },
      ] as QuickLink[],
    },
    {
      heading: "Connect",
      items: [
        { label: "Schedule a Call", description: "Book a 1-1 meeting", href: "/schedule", Icon: CalendarDays },
        { label: "Chat with my AI Assistant", description: "Instant answers, 24/7", href: "/chat", Icon: MessageCircle },
        { label: "WhatsApp", description: "Message me directly", href: `https://wa.me/${site.whatsapp}`, Icon: FaWhatsapp, external: true },
        { label: "Email", description: site.email, href: `mailto:${site.email}`, Icon: Mail },
      ] as QuickLink[],
    },
    {
      heading: "Follow",
      items: [
        { label: "LinkedIn", description: "10,000+ followers", href: site.socials.linkedin, Icon: FaLinkedin, external: true },
        { label: "GitHub", description: "Code & open-source work", href: site.socials.github, Icon: FaGithub, external: true },
      ] as QuickLink[],
    },
  ],
};

export interface FooterLink {
  label: string;
  href: string;
  placeholder?: boolean; // true = not a real destination yet, replace before launch
}

// Mirrors the reference site's 4-column footer structure exactly. Items that don't
// map to something you actually have yet are marked placeholder: true (href="#").
export const footerColumns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Me", href: "/#about" },
      { label: "Services", href: "/services" },
      { label: "Experience", href: "/#experience" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Testimonials", href: "/testimonials" },
      { label: "Schedule a Call", href: "/schedule" },
      { label: "FAQ", href: "/#faq" },
      { label: "All Links", href: "/links" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Email", href: `mailto:${site.email}` },
      { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` },
      { label: "LinkedIn", href: site.socials.linkedin },
      { label: "GitHub", href: site.socials.github },
    ],
  },
];

export interface SocialIconLink {
  label: string;
  href: string;
  Icon: IconType;
  placeholder?: boolean;
}

export const footerSocials: SocialIconLink[] = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: FaLinkedin },
  { label: "GitHub", href: site.socials.github, Icon: FaGithub },
];
