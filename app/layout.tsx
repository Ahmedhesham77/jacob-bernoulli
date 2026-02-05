"use client" // 🔑 مهم لجعل هذا component يعمل على الكلاينت

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import WelcomeLoader from "@/components/layout/WelcomeLoader"
import Navbar from "@/components/layout/Navbar"
import { preloadImages } from "@/lib/preload"
import LenisProvider from "@/components/layout/LenisProveider"
import featured from "@/data/images.mock.json"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  // 🔹 شرط التحميل (ولا نلمس أي شيء غيره)
  useEffect(() => {
    let mounted = true

    const loadAssets = async () => {
      try {
        const posters = featured.featured.items
          .filter(item => item.media.type === "video")
          .map(item => item.media.poster)

        await preloadImages(posters)

      } catch (err) {
        console.error("Preload error:", err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadAssets()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-[#0a0a0a] text-white overflow-x-hidden`}
      >
        {/* Container كامل الشاشة */}
        <div className="relative h-screen w-screen">
          {/* Loader */}
          <WelcomeLoader isVisible={loading} />

          {/* المحتوى الرئيسي */}
          {!loading && (
            <main className="h-full w-full">
              <Navbar />
              <LenisProvider>{children}</LenisProvider>
            </main>
          )}
        </div>
      </body>
    </html>
  )
}
