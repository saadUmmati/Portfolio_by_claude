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
    { label: "Python", Icon: SiPython, color: "currentColor" },
    { label: "LangChain", Icon: SiLangchain, color: "currentColor" },
    { label: "LangGraph", Icon: SiLanggraph, color: "currentColor" },
    { label: "Google Gemini", Icon: SiGooglegemini, color: "currentColor" },
    { label: "Claude / Anthropic", Icon: SiAnthropic, color: "currentColor" },
    { label: "DeepSeek", Icon: SiDeepseek, color: "currentColor" },
    { label: "Ollama", Icon: SiOllama, color: "currentColor" },
    { label: "Hugging Face", Icon: SiHuggingface, color: "currentColor" },
    { label: "spaCy", Icon: SiSpacy, color: "currentColor" },
    { label: "MLflow", Icon: SiMlflow, color: "currentColor" },
    { label: "OpenCV", Icon: SiOpencv, color: "currentColor" },
    { label: "YOLO", Icon: SiYolo, color: "currentColor" },
    { label: "Jupyter", Icon: SiJupyter, color: "currentColor" },
    { label: "Google Colab", Icon: SiGooglecolab, color: "currentColor" },
    { label: "Anaconda", Icon: SiAnaconda, color: "currentColor" },
    { label: "NumPy", Icon: SiNumpy, color: "currentColor" },
    { label: "Pandas", Icon: SiPandas, color: "currentColor" },
    { label: "scikit-learn", Icon: SiScikitlearn, color: "currentColor" },
    { label: "PyTorch", Icon: SiPytorch, color: "currentColor" },
    { label: "TensorFlow", Icon: SiTensorflow, color: "currentColor" },
  ],
  // Row 2: Automation platforms, app frameworks & deployment, mobile / dev tooling
  [
    { label: "n8n", Icon: SiN8N, color: "currentColor" },
    { label: "Make", Icon: SiMake, color: "currentColor" },
    { label: "Zapier", Icon: SiZapier, color: "currentColor" },
    { label: "Streamlit", Icon: SiStreamlit, color: "currentColor" },
    { label: "Gradio", Icon: SiGradio, color: "currentColor" },
    { label: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
    { label: "Vercel", Icon: SiVercel, color: "currentColor" },
    { label: "TypeScript", Icon: SiTypescript, color: "currentColor" },
    { label: "Kotlin", Icon: SiKotlin, color: "currentColor" },
    { label: "Android Studio", Icon: SiAndroidstudio, color: "currentColor" },
    { label: "Kubernetes", Icon: SiKubernetes, color: "currentColor" },
    { label: "Git", Icon: SiGit, color: "currentColor" },
    { label: "GitHub", Icon: SiGithub, color: "currentColor" },
  ],
];
