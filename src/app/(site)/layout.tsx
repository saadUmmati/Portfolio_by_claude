import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatFab from "@/components/ChatFab";
import CustomCursor from "@/components/CustomCursor";
import CursorPositionHUD from "@/components/CursorPositionHUD";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <CursorPositionHUD />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatFab />
    </>
  );
}
