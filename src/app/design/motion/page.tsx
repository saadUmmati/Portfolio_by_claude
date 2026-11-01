import type { Metadata } from "next";
import MotionLab from "./MotionLab";

export const metadata: Metadata = {
  title: "Motion lab",
  robots: { index: false, follow: false }, // internal test page
};

export default function Page() {
  return <MotionLab />;
}
