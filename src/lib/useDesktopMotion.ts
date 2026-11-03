"use client";

import { useEffect, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";

/** True only on a desktop-class device (wide + mouse) that has not asked for reduced motion.
    False on the server and on the first render, so the static layout is what loads first. */
export function useDesktopMotion() {
  const { reduced } = useMotion();
  const [yes, setYes] = useState(false);
  useEffect(() => {
    setYes(!reduced && window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches);
  }, [reduced]);
  return yes;
}
