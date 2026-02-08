"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { collections, Collection } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { House, X, Mouse } from "lucide-react";
import MainCollectionSection from "@/components/MainCollectionSection";
import { mockProducts } from "@/data/mockProducts";
import "swiper/css";
gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
export default function HeroCollections() {
  const [active, setActive] = useState<Collection>(collections[0]);
  const [showRooms, setShowRooms] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
const sectionRef = useRef<HTMLDivElement>(null);
const nextSectionRef = useRef<HTMLDivElement>(null);

  /* ───────── Open Rooms (Smooth) ───────── */
  const openRooms = () => {
    setShowRooms(true);

    const tl = gsap.timeline();

    tl.to(heroRef.current, {
      scale: 0.88,
      duration: 1.1,
      ease: "power4.inOut",
    }).fromTo(
      sliderRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  };
  
const filteredProducts = mockProducts.filter(
  (p) => p.collectionId === active.title

);


  /* ───────── Select Room (Smooth) ───────── */
  const selectRoom = (collection: Collection) => {
    setActive(collection);

    const tl = gsap.timeline({
      onComplete: () => setShowRooms(false),
    });

    tl.to(sliderRef.current, {
      opacity: 0,
      y: 80,
      duration: 0.6,
      ease: "power2.in",
    }).to(
      heroRef.current,
      {
        scale: 1,
        duration: 1,
        ease: "power4.inOut",
      },
      "-=0.3"
    );
  };

  /* ───────── Scroll Hint Animation ───────── */
  useEffect(() => {
    if (showRooms) return;

    const ctx = gsap.context(() => {
      gsap.set(scrollHintRef.current, { opacity: 0 });

      gsap.to(scrollHintRef.current, {
        opacity: 1,
        delay: 3,
        duration: 1,
      });

      gsap.to(scrollHintRef.current, {
        y: 16,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.2,
        delay: 3,
      });
    });

    return () => ctx.revert();
  }, [showRooms]);

  useEffect(() => {
  if (showRooms) return;

  const ctx = gsap.context(() => {
    gsap.set(videoWrapperRef.current, {
      scale: 1,
      force3D: true,
      transformOrigin: "center center",
    });

    gsap.fromTo(
      videoWrapperRef.current,
      { scale: 1 },
      {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6, // ← مهم
        },
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, [showRooms]);


  return (
    <>
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden text-white">
      {/* HERO */}
      <div ref={heroRef} className="relative w-full h-full overflow-hidden">
        <div ref={videoWrapperRef}
          className="absolute inset-0 will-change-transform">
        <Image
          src={active.poster || ""}
          alt=""
          fill
          className="absolute inset-0 object-cover"
          priority
        />

        <video
          key={active.video}
          src={active.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: 0 }}
          onCanPlay={(e) => (e.currentTarget.style.opacity = "1")}
        />
</div>
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Title */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
          <h1 className="text-3xl md:text-5xl font-[200] tracking-wide text-center">
            {active.title}
          </h1>
        </div>

        {/* Home / Close */}
        <button
          onClick={showRooms ? () => selectRoom(active) : openRooms}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30
                     w-14 h-14 rounded-full
                     bg-white/10 backdrop-blur
                     flex items-center justify-center
                     hover:scale-110 transition"
        >
          {showRooms ? <X size={26} /> : <House strokeWidth={1.5} />}
        </button>

        {/* Scroll Hint */}
        {!showRooms && (
          <div
            ref={scrollHintRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20
                       flex flex-col items-center gap-1 opacity-0"
          >
            <Mouse size={22} />
            <span className="text-xs tracking-widest opacity-70">Discover</span>
          </div>
        )}
      </div>

      {/* ROOMS SLIDER */}
      {showRooms && (
        <div
          ref={sliderRef}
          className="absolute bottom-10 left-0 w-full z-30 px-6"
        >
          <Swiper slidesPerView={1.7} spaceBetween={20} breakpoints={{ 768: { slidesPerView: 3 } }}>
            {collections.map((c) => {
              const isActive = c.id === active.id;

              return (
                <SwiperSlide key={c.id}>
                  <div
                    onClick={() => selectRoom(c)}
                    className="relative aspect-video overflow-hidden rounded-xl cursor-pointer"
                  >
                    <Image
                      src={c.poster || ""}
                      alt={c.title}
                      fill
                      className={`object-cover transition-all duration-500
                        `}
                    />
                    {isActive && (
  <div className="absolute inset-0 z-20 rounded-xl pointer-events-none
    ring-1 ring-[hsl(var(--luxury-gold)/0.5)]
    shadow-[0_0_40px_hsl(var(--luxury-gold)/0.35)]" />
)}

                    {/* Dark overlay for inactive */}
                    {!isActive && (
                      <div className="hero-overlay absolute inset-0 bg-black/55 z-10" />
                    )}

                    <span className="absolute bottom-4 left-4 z-20 font-[300]">
                      {c.title}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </section>

<MainCollectionSection
  collection={active}
  products={filteredProducts}
/>
</>
  );
}
