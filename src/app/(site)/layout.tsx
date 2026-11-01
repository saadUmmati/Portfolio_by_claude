import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatFab from "@/components/ChatFab";
import CustomCursor from "@/components/CustomCursor";
import CursorPositionHUD from "@/components/CursorPositionHUD";
import MotionProvider from "@/components/motion/MotionProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <ScrollProgress />
      <CustomCursor />
      <CursorPositionHUD />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatFab />
    </MotionProvider>
  );
}
