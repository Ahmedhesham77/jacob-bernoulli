"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

const IMAGES_CONFIG = {
  top: [
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221038-source/pp-7968-300r-001-banner-screen-16-9", type: "side", position: "left-1/2" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/221033-source/pp-7300-1200a-011-banner-screen-16-9", type: "side", position: "right-1/2" },
  ],
  center: [
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220764-source/pp-4997-200g-001-banner-screen-16-9", type: "side", position: "right-full" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220821-source/pp-5905-1a-001-banner-screen-16-9", type: "main", position: "" },
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220820-source/pp-5905r-010-banner-screen-16-9", type: "side", position: "left-full" },
  ],
  bottom: [
    { src: "https://patek-res.cloudinary.com/video/upload/f_auto:video/dfsmedia/0906caea301d42b3b8bd23bd656d1711/220683-source/pp-7300-1200a-010-banner-screen-16-9", type: "side", position: "left-1/2" },
    { src: "/video1.mp4", type: "side", position: "right-1/2" },
  ],
};

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function Home() {
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const video4Ref = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    CustomEase.create(
      "slowStart",
      "M0,0 C0,0 0.226,-0.0006 0.594,0.145 0.754,0.242 1,1.019 1,1.019"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
      },
    });

    tl.to("[data-scale]", {
      scale: 0.20,
      duration: 15,
    });

    tl.to(
      `[data-zoom-type="side"], [data-zoom-type="main"]`,
      {
        clipPath: "inset(10px round 12px)",
        ease: "power2.out",
        duration: 15,
      },
      0
    );

    tl.to(
      "[data-scale]",
      {
        y: "-25vh",
        ease: "slowStart",
        duration: 10,
      },
      0
    );
  });

  useEffect(() => {
    const video = video4Ref.current;
    if (!video) return;

    // بدء التشغيل التلقائي من الثانية الخامسة
    const startVideo = async () => {
      try {
        video.currentTime = 5; // بدء من الثانية 5
        await video.play(); // تشغيل الفيديو (iOS/Android يتطلب play صريح)
      } catch (e) {
        console.warn("Autoplay failed:", e);
      }
    };

    startVideo();
  }, []);

  return (
    <main>
      <section ref={stickyContainerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div data-scale className="relative h-screen w-screen will-change-transform">

            {/* ================= TOP ================= */}
            <div data-section="top" className="absolute h-screen w-screen top-full">
              {IMAGES_CONFIG.top.map((item, index) => (
                <div key={`top-${index}`} className={`absolute ${item.position} w-full h-full`}>
                  <video
                    data-zoom-type={item.type}
                    src={item.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* ================= CENTER ================= */}
            {/* ================= CENTER ================= */}
            <div data-section="center">
              {IMAGES_CONFIG.center.map((item, index) => (

                <div
                  key={`center-${index}`}
                  className={`
    absolute ${item.position}
    w-screen
    h-screen
    flex items-center justify-center
  `}
                >
                  {/* Wrapper مسؤول عن الـ aspect ratio */}
                  <div
                    className="
      relative
    h-screen
w-screen 
      aspect-9/16        /* موبايل */
  
    "
                  >
                    <video
                      ref={index === 1 ? video4Ref : null}
                      data-zoom-type={item.type}
                      src={item.src} muted
                      playsInline
                      autoPlay
                      loop
                      preload="auto"
                      className="
  h-screen
  w-screen
        object-cover

      "
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* ================= BOTTOM ================= */}
            <div data-section="bottom" className="absolute h-screen w-screen bottom-full">
              {IMAGES_CONFIG.bottom.map((item, index) => (
                <div key={`bottom-${index}`} className={`absolute ${item.position} w-screen h-screen`}>
                  <video
                    data-zoom-type={item.type}
                    src={item.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
