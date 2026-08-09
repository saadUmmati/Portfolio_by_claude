import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiOpencv,
  SiAnthropic,
  SiGooglegemini,
  SiHuggingface,
  SiLangchain,
  SiLanggraph,
  SiSpacy,
  SiOllama,
  SiMlflow,
  SiJupyter,
  SiGooglecolab,
  SiAnaconda,
  SiDeepseek,
  SiYolo,
  SiKotlin,
  SiAndroidstudio,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiTypescript,
  SiN8N,
  SiZapier,
  SiMake,
  SiStreamlit,
  SiGradio,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

export interface TechIcon {
  label: string;
  Icon: IconType;
  color: string; // brand color, or "currentColor" for icons that should adapt to theme
}

// Two rows only, each scrolling at its own slow speed (see TechMarquee).
export const techIconRows: TechIcon[][] = [
  // Row 1: AI / ML / LLM & agent frameworks, model providers, notebooks
  [
    { label: "Python", Icon: SiPython, color: "#3776AB" },
    { label: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
    { label: "LangGraph", Icon: SiLanggraph, color: "currentColor" },
    { label: "Google Gemini", Icon: SiGooglegemini, color: "#4285F4" },
    { label: "Claude / Anthropic", Icon: SiAnthropic, color: "currentColor" },
    { label: "DeepSeek", Icon: SiDeepseek, color: "#4D6BFE" },
    { label: "Ollama", Icon: SiOllama, color: "currentColor" },
    { label: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E" },
    { label: "spaCy", Icon: SiSpacy, color: "#09A3D5" },
    { label: "MLflow", Icon: SiMlflow, color: "#0194E2" },
    { label: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
    { label: "YOLO", Icon: SiYolo, color: "currentColor" },
    { label: "Jupyter", Icon: SiJupyter, color: "#F37626" },
    { label: "Google Colab", Icon: SiGooglecolab, color: "#F9AB00" },
    { label: "Anaconda", Icon: SiAnaconda, color: "#44A833" },
    { label: "NumPy", Icon: SiNumpy, color: "#4DABCF" },
    { label: "Pandas", Icon: SiPandas, color: "#150458" },
    { label: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
    { label: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
    { label: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  ],
  // Row 2: Automation platforms, app frameworks & deployment, mobile / dev tooling
  [
    { label: "n8n", Icon: SiN8N, color: "#EA4B71" },
    { label: "Make", Icon: SiMake, color: "#6D00CC" },
    { label: "Zapier", Icon: SiZapier, color: "#FF4A00" },
    { label: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
    { label: "Gradio", Icon: SiGradio, color: "#F97316" },
    { label: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
    { label: "Vercel", Icon: SiVercel, color: "currentColor" },
    { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { label: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
    { label: "Android Studio", Icon: SiAndroidstudio, color: "#3DDC84" },
    { label: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
    { label: "Git", Icon: SiGit, color: "#F05032" },
    { label: "GitHub", Icon: SiGithub, color: "currentColor" },
  ],
];
