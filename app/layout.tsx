"use client" // 🔑 مهم لجعل هذا component يعمل على الكلاينت

import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import WelcomeLoader from "@/components/layout/WelcomeLoader"
import Navbar from "@/components/layout/Navbar"
import { preloadImages } from "@/lib/preload"
import images from "@/data/images.mock.json"
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

  useEffect(() => {
    const imageSources = [
      images.hero.image,
      ...images.story.map(s => s.image),
      ...images.featured.items.map(i => i.image),
      images.cta.background,
    ]

    // ⏱️ تحميل الصور + حد أدنى للعرض
    Promise.all([
      preloadImages(imageSources),
      new Promise(resolve => setTimeout(resolve, 1500)),
    ]).then(() => setLoading(false))
  }, [])

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {/* Container كامل الشاشة */}
        <div className="relative h-screen w-screen">
          {/* Loader */}
          <WelcomeLoader isVisible={loading} />

          {/* المحتوى الرئيسي */}
          {!loading && (
            <main className="h-full w-full">
              <Navbar />
              {children}
            </main>
          )}
        </div>
      </body>
    </html>
  )
}
