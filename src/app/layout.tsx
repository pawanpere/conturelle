import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import SilkCanvas from "@/components/SilkCanvas";
import LaceCorner from "@/components/LaceCorner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Conturelle by Felina — Engineered for the Way You Move",
  description:
    "140 Years of German Precision. Premium European lingerie crafted from up to 80 individual pieces. Perfect fit, every time.",
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
          <SilkCanvas />
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LaceCorner />
        </CartProvider>
      </body>
    </html>
  );
}
