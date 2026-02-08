"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import WelcomeLoader from "@/components/layout/WelcomeLoader";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/layout/LenisProveider";
import { preloadImages } from "@/lib/preload";
import { collections } from "@/data/collections";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const preloadAssets = async () => {
      try {
        // ✅ preload posters فقط (LCP سريع + no black screen)
        const posters = collections
          .map(c => c.poster)
          .filter((poster): poster is string => Boolean(poster));

        await preloadImages(posters);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    preloadAssets();
    return () => { mounted = false };
  }, []);

  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased bg-[#0a0a0a] text-white overflow-x-hidden`}>
        <WelcomeLoader isVisible={loading} />

        {!loading && (
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        )}
      </body>
    </html>
  );
}
