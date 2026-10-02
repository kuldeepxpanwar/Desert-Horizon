import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import LenisProvider from "@/components/providers/LenisProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import SVGFilters from "@/components/ui/SVGFilters";
import CustomCursor from "@/components/ui/CustomCursor";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Desert Horizon | Luxury Camp in Jaisalmer",
  description: "Experience the ultimate luxury in the heart of the Thar Desert. Unforgettable nights beneath the stars of Jaisalmer.",
  metadataBase: new URL("https://desert-horizon.vercel.app"),
  openGraph: {
    title: "Desert Horizon | Luxury Camp in Jaisalmer",
    description: "Experience the ultimate luxury in the heart of the Thar Desert.",
    url: "https://desert-horizon.vercel.app",
    siteName: "Desert Horizon",
    images: [
      {
        url: "/images/home-hero.webp", // Will act as OG Image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desert Horizon | Luxury Camp",
    description: "Experience the ultimate luxury in the heart of the Thar Desert.",
    images: ["/images/home-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased font-sans text-body bg-canvas-parchment`}
      >
        <CustomCursor />
        <SVGFilters />
        <LoadingScreen />
        <ScrollProgressBar />
        <Toaster position="bottom-center" toastOptions={{ style: { background: '#1C1917', color: '#D4AF37', border: '1px solid #D4AF37', letterSpacing: '1px' } }} />
        <LenisProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
