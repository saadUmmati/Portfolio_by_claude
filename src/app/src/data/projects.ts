export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  gradient: string; // tailwind gradient classes -- used as a fallback if image is unset
  image?: string; // real hero image, falls back to the gradient tile if omitted
}

// Your real projects. Swap `href` to a live URL once one exists.
export const projects: Project[] = [
  {
    title: "ClipGallery",
    category: "ON-DEVICE AI",
    description:
      "A native Android gallery app with fully on-device AI clustering using DINOv2 (ONNX INT8), semantic cluster naming via CLIP, and a 30-day recycle bin.",
    tags: ["Kotlin", "ONNX", "DINOv2", "CLIP"],
    href: "https://github.com/saadUmmati/clip_gallery",
    gradient: "from-violet-600 via-fuchsia-500 to-sky-500",
    image: "/images/projects/clipgallery-hero.png",
  },
  {
    title: "Virtual Try-On (CATVTON)",
    category: "COMPUTER VISION",
    description:
      "Integrated a CATVTON-based virtual try-on system into a live MERN e-commerce store, letting shoppers preview clothing in real time.",
    tags: ["MERN", "Computer Vision", "PyTorch"],
    href: "https://github.com/saadummati",
    gradient: "from-sky-500 via-cyan-400 to-emerald-400",
    image: "/images/projects/virtual-tryon-hero.png",
  },
  {
    title: "YOLOv8 Helmet Detection",
    category: "COMPUTER VISION",
    description:
      "A custom-trained YOLOv8 model for real-time helmet detection, built for workplace safety monitoring use cases.",
    tags: ["YOLOv8", "Python", "Computer Vision"],
    href: "https://github.com/saadUmmati/Helmet-Detection-in-CV",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    image: "/images/projects/helmet-detection-hero.png",
  },
  {
    title: "AR Measurement App",
    category: "ON-DEVICE AI",
    description:
      "Researched and planned a hybrid ARCore + Depth Anything V2 (ONNX) measurement app for Android — an iPhone Measure-app equivalent.",
    tags: ["ARCore", "Depth Anything V2", "Android"],
    href: "https://github.com/saadummati",
    gradient: "from-indigo-600 via-violet-500 to-purple-500",
    image: "/images/projects/ar-measurement-hero.png",
  },
  {
    title: "Melodix Music Player",
    category: "MOBILE APP",
    description:
      "A complete Kotlin/XML music player with MediaSession, a foreground service, notification seekbar, and Glide-powered album art.",
    tags: ["Kotlin", "XML", "MediaSession"],
    href: "https://github.com/saadUmmati/TaskeenMusicPlayer",
    gradient: "from-pink-500 via-rose-500 to-amber-400",
    image: "/images/projects/melodix-hero.png",
  },
];
