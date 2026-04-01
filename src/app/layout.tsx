import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ExitPopup from "@/components/ExitPopup";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Conturelle by Felina — European Lingerie Since 1885",
  description:
    "Premium European lingerie crafted from up to 80 individual pieces. 140 years of expertise. Perfect fit, every time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-space)]">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Navbar />
            <main style={{ paddingTop: "var(--header-height)" }}>{children}</main>
            <Footer />
            <MobileBottomNav />
            <ExitPopup />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
