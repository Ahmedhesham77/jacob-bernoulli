"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

const IMAGES_CONFIG = {
  top: [
    { src: "/video1.mp4", type: "side", position: "left-1/2" },
    { src: "/video2.mp4", type: "side", position: "right-1/2" },
  ],
  center: [
    { src: "/video3.mp4", type: "side", position: "right-full" },
    { src: "/video3.mp4", type: "main", position: "" },
    { src: "/video5.mp4", type: "side", position: "left-full" },
  ],
  bottom: [
    { src: "/video6.mp4", type: "side", position: "left-1/2" },
    { src: "/video7.mp4", type: "side", position: "right-1/2" },
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
        scrub: 0.5,
      },
    });

    tl.to("[data-scale]", {
      scale: 0.51,
      duration: 10,
    });

    tl.to(
      `[data-zoom-type="side"], [data-zoom-type="main"]`,
      {
        clipPath: "inset(10px round 12px)",
        ease: "power4.out",
        duration: 10,
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
                <div key={`top-${index}`} className={`absolute ${item.position} w-screen h-screen`}>
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
            <div data-section="center">
              {IMAGES_CONFIG.center.map((item, index) => (
                <div key={`center-${index}`} className={`absolute ${item.position} w-screen h-screen`}>
                  <video
                    ref={index === 1 ? video4Ref : null} // الفيديو الرابع
                    data-zoom-type={item.type}
                    src={item.src}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="auto"
                    className="w-screen h-screen object-cover "
                  />
                </div>
              ))}
            </div>

            {/* ================= BOTTOM ================= */}
            <div data-section="bottom" className="absolute h-screen w-screen top-full">
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
