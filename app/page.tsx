"use client";

import { useRef, useEffect, forwardRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

interface VideoConfig {
  src: string;
  type: "side" | "main";
  position: string;
  category: string;
}

interface VideoSection {
  top: VideoConfig[];
  center: VideoConfig[];
  bottom: VideoConfig[];
}

const VIDEOS_CONFIG: VideoSection = {
  top: [
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221038-source/pp-7968-300r-001-banner-screen-16-9", 
      type: "side", 
      position: "left-1/2",
      category: "Ladies First"
    },
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221033-source/pp-7300-1200a-011-banner-screen-16-9", 
      type: "side", 
      position: "right-1/2",
      category: "Aquanaut Luce"
    },
  ],
  center: [
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220764-source/pp-4997-200g-001-banner-screen-16-9", 
      type: "side", 
      position: "left-full",
      category: "Calatrava"
    },
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220821-source/pp-5905-1a-001-banner-screen-16-9", 
      type: "main", 
      position: "",
      category: "Annual Calendar"
    },
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220820-source/pp-5905r-010-banner-screen-16-9", 
      type: "side", 
      position: "right-full",
      category: "Complications"
    },
  ],
  bottom: [
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220683-source/pp-7300-1200a-010-banner-screen-16-9", 
      type: "side", 
      position: "left-1/2",
      category: "Nautilus"
    },
    { 
      src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221033-source/pp-7300-1200a-011-banner-screen-16-9", 
      type: "side", 
      position: "right-1/2",
      category: "Grand Complications"
    },
  ],
};

gsap.registerPlugin(ScrollTrigger, CustomEase);

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});

interface VideoItemProps {
  item: VideoConfig;
}

const VideoItem = forwardRef<HTMLVideoElement, VideoItemProps>(
  ({ item }, ref) => {
    const isMain = item.type === "main";
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
      if (isMain) return;
      
      setIsHovered(true);
      
      // Play video
      const video = localVideoRef.current;
      if (video) {
        video.play().catch(() => {});
      }

      // Animate blur removal
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Fade out category text
      if (categoryRef.current) {
        gsap.to(categoryRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }, [isMain]);

    const handleMouseLeave = useCallback(() => {
      if (isMain) return;
      
      setIsHovered(false);

      // Animate blur back
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          backdropFilter: "blur(8px)",
          duration: 0.6,
          ease: "power2.inOut",
        });
      }

      // Fade in category text
      if (categoryRef.current) {
        gsap.to(categoryRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }, [isMain]);
    
    return (
      <div 
        className="video-container w-full h-full relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={ref || localVideoRef}
          src={item.src}
          data-zoom-type={item.type}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          className="w-full h-full object-cover"
        />
        
        {/* Blur + Dim Overlay for side videos */}
        {!isMain && (
          <div 
            ref={overlayRef}
            className="video-blur-overlay"
            data-blur-overlay="side"
          >
            {/* Category text on blur overlay */}
            <div 
              ref={categoryRef}
              className="category-overlay-text"
              data-category-text="side"
            >
              <span className="category-label">{item.category}</span>
            </div>
          </div>
        )}
        
        {/* Category Badge for main video */}
        {isMain && (
          <div 
            className="category-badge-main"
            data-category-main
          >
            <span className="text-luxury-gold">{item.category}</span>
          </div>
        )}

        {/* Hover indicator for side videos */}
        {!isMain && (
          <div 
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-luxury-black/60 backdrop-blur-sm border border-luxury-gold/30">
              <span className="text-xs font-medium tracking-widest uppercase text-luxury-gold">
                {item.category}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoItem.displayName = "VideoItem";

export default function Index() {
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const videoMainRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    CustomEase.create(
      "ease-out",
      "M0,0 C0.15,0 0.25,0.1 0.4,0.3 0.6,0.6 1,1 1,1"
    );

    // Set initial states
    gsap.set("[data-blur-overlay='side']", {
      opacity: 0,
      backdropFilter: "blur(0px)",
    });

    gsap.set("[data-category-text='side']", {
      opacity: 0,
      y: 30,
      scale: 0.9,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyContainerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Scale animation
    tl.to("[data-scale]", {
      scale: 0.48,
      yPercent: -12,
      ease: "power2.out",
      duration: 10,
    });

    // Clip path animation
    tl.to(
      `[data-zoom-type="side"], [data-zoom-type="main"]`,
      {
        clipPath: "inset(2% round 12px)",
        ease: "ease-out",
        duration: 1,
      },
      0
    );

    // Blur + Dim overlay animation for side videos
    tl.to(
      "[data-blur-overlay='side']",
      {
        opacity: 1,
        backdropFilter: "blur(8px)",
        ease: "power2.inOut",
        duration: 1,
      },
      0
    );

    // Category text animation - appears with blur
    tl.to(
      "[data-category-text='side']",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power3.out",
        duration: 1,
        stagger: 0.05,
      },
      0.2
    );

    // Main video category badge
    tl.to(
      "[data-category-main]",
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1,
      },
      0.3
    );
  }, []);

  useEffect(() => {
    const video = videoMainRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.currentTime = 5;
        await video.play();
      } catch {
        // iOS safe silent fail
      }
    };

    play();
  }, []);

  return (
    <main className="touch-pan-y bg-luxury-black">
      <section 
        ref={stickyContainerRef} 
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          <div
            data-scale
            className="relative h-screen w-screen will-change-transform"
            style={{ touchAction: "pan-y" }}
          >
            {/* TOP ROW */}
            <div className="absolute top-full h-screen w-screen">
              {VIDEOS_CONFIG.top.map((item, i) => (
                <div 
                  key={`top-${i}`} 
                  className={`absolute ${item.position} w-full h-full`}
                >
                  <VideoItem item={item} />
                </div>
              ))}
            </div>

            {/* CENTER ROW */}
            {VIDEOS_CONFIG.center.map((item, i) => (
              <div
                key={`center-${i}`}
                className={`absolute ${item.position} aspect-video w-screen h-screen flex items-center justify-center`}
              >
                <VideoItem 
                  item={item} 
                  ref={item.type === "main" ? videoMainRef : undefined}
                />
              </div>
            ))}

            {/* BOTTOM ROW */}
            <div className="absolute bottom-full h-screen w-screen">
              {VIDEOS_CONFIG.bottom.map((item, i) => (
                <div 
                  key={`bottom-${i}`} 
                  className={`absolute ${item.position} w-screen h-screen`}
                >
                  <VideoItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for scroll */}
      <section className="h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-light tracking-widest text-luxury-gold mb-4">
            Timeless Elegance
          </h2>
          <p className="text-luxury-ivory/60 text-lg tracking-wide">
            Discover the Art of Horology
          </p>
        </div>
      </section>
    </main>
  );
}
