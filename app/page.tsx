"use client"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase"



const ROOM_CONFIG = {
  top: [
    {
      src: "/room_0.mp4",
      type: "side",
      position: "left-1/2",
    },
    {
      src: "/room_1.mp4",
      type: "side",
      position: "right-1/2",
    }

  ],
  center: [
    {
      src: "/room_2.mp4",
      type: "side",
      position: "left-full",
    },
    {
      src: "/room_3.mp4",
      type: "main",
      position: "",
    },
    {
      src: "/room_4.mp4",
      type: "side",
      position: "right-full",
    }
  ],
  bottom: [
    {
      src: "/vido9.mp4",
      type: "side",
      position: "left-1/2",
    },
    {
      src: "/video10.mp4",
      type: "side",
      position: "right-1/2",
    }
  ]
}
gsap.registerPlugin(ScrollTrigger, CustomEase)
export default function Home() {
  const stickeyContainerRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    CustomEase.create("slowStart", "M0,0 C0,0.266,-0.0006 0.549, 0.145 0.754,0.242 1,019 1.019")
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickeyContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });
    tl.to("[data-scale]", {
      scale: 0.51,
      duration: 10
    })
    tl.to(
      `[ data-zoom-type="side"],[data-zoom-type="main"]`,
      {
        clipPath: "inset(10px round 10px)",
        duration: 10,
        ease: "power4.out"
      },
      0
    )
    tl.to(
      "[data-scale],[data-text-center]", {
      y: "-25%",
      duration: 10,
      ease: "slowStart"
    },
      0

    )
  })
  return <main>
    <section ref={stickeyContainerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div data-scale className="relative h-screen w-screen will-change-transform">
          <div data-section="top"
            className="absolute bottom-full h-screen w-screen"
          >
            {ROOM_CONFIG.top.map((room, idx) => (
              <div key={`top-${idx}`} className={`absolute aspect-video h-screen w-screen ${room.position}`}>
                <video
                  data-zoom-type={room.type}
                  src={room.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`object-cover w-full h-full`} />
              </div>))}
          </div>

          <div data-section="center"
          >
            {ROOM_CONFIG.center.map((room, idx) => (
              <div key={`center-${idx}`} className={`absolute aspect-video h-screen w-screen ${room.position}`}>
                <video
                  data-zoom-type={room.type}
                  src={room.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={` object-cover  h-full w-full `}
                />
              </div>
            ))}
          </div>

          <div data-section="bottom"
            className="absolute top-full h-screen w-screen">
            {ROOM_CONFIG.bottom.map((room, idx) => (
              <div key={`bottom-${idx}`} className={`absolute aspect-video h-screen w-screen ${room.position}`}>
                <video
                  data-zoom-type={room.type}
                  src={room.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={` object-cover h-full w-full `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </main>
}