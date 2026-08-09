"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with class set by the pre-hydration theme script
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="cursor-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
