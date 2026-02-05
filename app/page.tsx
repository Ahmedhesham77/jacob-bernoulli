"use client";

import { useRef, useState, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface VideoConfig {
  src: string;
  type: "side" | "main";
  category: string;
}

interface VideoItemProps {
  item: VideoConfig;
  isMain?: boolean;
}

const VIDEOS_CONFIG: VideoConfig[][] = [
  // Top Row
  [
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221038-source/pp-7968-300r-001-banner-screen-16-9", type: "side", category: "Ladies First" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221033-source/pp-7300-1200a-011-banner-screen-16-9", type: "side", category: "Aquanaut Luce" },
  ],
  // Center Row
  [
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220764-source/pp-4997-200g-001-banner-screen-16-9", type: "side", category: "Calatrava" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220821-source/pp-5905-1a-001-banner-screen-16-9", type: "main", category: "Annual Calendar" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220820-source/pp-5905r-010-banner-screen-16-9", type: "side", category: "Complications" },
  ],
  // Bottom Row
  [
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220683-source/pp-7300-1200a-010-banner-screen-16-9", type: "side", category: "Nautilus" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221033-source/pp-7300-1200a-011-banner-screen-16-9", type: "side", category: "Grand Complications" },
  ],
];

const VideoItem = forwardRef<HTMLDivElement, VideoItemProps>(
  ({ item, isMain }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleInteraction = (play: boolean) => {
      if (isMain && !play && !isHovered) return;
      setIsHovered(play);
      if (videoRef.current) {
        play ? videoRef.current.play().catch(() => undefined) : videoRef.current.pause();
      }
    };

    return (
      <div
        ref={ref}
        className={`relative w-full h-full overflow-hidden rounded-xl transition-all duration-700 group ${isMain ? "z-10" : "z-0"}`}
        onMouseEnter={() => handleInteraction(true)}
        onMouseLeave={() => handleInteraction(false)}
        data-zoom-item
      >
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          autoPlay={isMain}
          playsInline
          className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? "scale-110 blur-0" : "scale-100"}`}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-700 flex items-center justify-center
            ${isHovered ? "bg-transparent backdrop-blur-0" : "bg-luxury-black/60 backdrop-blur-md"}`}
        >
          <div className={`text-center transition-all duration-500 ${isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
            <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase mb-3 opacity-70">Collection</p>
            <h3 className="text-luxury-ivory font-serif text-2xl md:text-3xl tracking-widest uppercase font-light">
              {item.category}
            </h3>
            <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-luxury-gold transition-all duration-700 mx-auto opacity-40" />
          </div>
        </div>
      </div>
    );
  }
);

VideoItem.displayName = "VideoItem";

export default function LuxuryGallery() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const mainVideoWrapperRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.set(gridRef.current, { scale: 3.5 });

    tl.to(gridRef.current, { scale: 1, ease: "power2.inOut" })
      .to("[data-zoom-item]:not(:nth-child(5))", {
        filter: "contrast(1.1) brightness(0.8)",
        stagger: { amount: 0.3, from: "center" },
      }, 0);
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-luxury-black">
      <div className="h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-10">
        <div ref={gridRef} className="gallery-layout w-full h-[100vh] grid grid-cols-12 grid-rows-12 gap-2 md:gap-6">
          {/* Top Row */}
          <VideoItem item={VIDEOS_CONFIG[1][0]} />
          <div className="hidden md:block" />
          <VideoItem item={VIDEOS_CONFIG[0][1]} />

          {/* Center Row */}
          <VideoItem item={VIDEOS_CONFIG[1][0]} />
          <VideoItem ref={mainVideoWrapperRef} item={VIDEOS_CONFIG[1][1]} isMain />
          <VideoItem item={VIDEOS_CONFIG[1][2]} />

          {/* Bottom Row */}
          <VideoItem item={VIDEOS_CONFIG[2][0]} />
          <div className="hidden md:block" />
          <VideoItem item={VIDEOS_CONFIG[2][1]} />
        </div>
      </div>

      <section className="h-screen flex items-center justify-center bg-black">
        <div className="text-center px-4">
          <span className="text-luxury-gold tracking-[1em] text-sm uppercase">Since 1839</span>
          <h2 className="text-luxury-ivory text-4xl md:text-6xl font-serif mt-6 italic">Timeless Excellence</h2>
        </div>
      </section>
    </main>
  );
}
