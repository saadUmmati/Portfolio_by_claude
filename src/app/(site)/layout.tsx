import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatFab from "@/components/ChatFab";
import GlobalBackground from "@/components/GlobalBackground";
import CustomCursor from "@/components/CustomCursor";
import CursorPositionHUD from "@/components/CursorPositionHUD";
import LiquidGlassFilter from "@/components/LiquidGlassFilter";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidGlassFilter />
      <GlobalBackground />
      <CustomCursor />
      <CursorPositionHUD />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatFab />
    </>
  );
}
