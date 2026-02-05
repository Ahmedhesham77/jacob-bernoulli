// "use client"

// import { useEffect, useRef } from "react"
// import Image from "next/image"
// import gsap from "gsap"
// import { ScrollTrigger, Flip } from "gsap/all"

// gsap.registerPlugin(ScrollTrigger, Flip)

// export default function LuxuryHero() {
//     const galleryRef = useRef<HTMLDivElement>(null)
//     const wrapperRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         if (!galleryRef.current || !wrapperRef.current) return

//         let ctx: gsap.Context

//         const createAnimation = () => {
//             ctx?.revert()

//             ctx = gsap.context(() => {
//                 const gallery = galleryRef.current!
//                 const items = gallery.querySelectorAll(".gallery-item")

//                 gallery.classList.remove("gallery-final")

//                 // Capture final layout
//                 gallery.classList.add("gallery-final")
//                 const state = Flip.getState(items)
//                 gallery.classList.remove("gallery-final")

//                 const flip = Flip.to(state, {
//                     ease: "power4.inOut",
//                     duration: 1.2,
//                     stagger: 0.05
//                 })

//                 const tl = gsap.timeline({
//                     scrollTrigger: {
//                         trigger: wrapperRef.current,
//                         start: "top top",
//                         end: "+=200%",
//                         scrub: true,
//                         pin: true
//                     }
//                 })

//                 tl.add(flip)

//                 // تغيير الخلفية أثناء التمرير
//                 tl.to(wrapperRef.current, {
//                     background:
//                         "var(--gradient-luxury-main)",
//                     duration: 1
//                 })

//             })
//         }

//         createAnimation()
//         window.addEventListener("resize", createAnimation)

//         return () => {
//             ctx?.revert()
//             window.removeEventListener("resize", createAnimation)
//         }
//     }, [])

//     return (
//         <section
//             ref={wrapperRef}
//             className="relative h-screen w-full overflow-hidden bg-luxury-black"
//         >
//             {/* Overlay Soft Gradient */}
//             <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-luxury-soft)] z-10" />

//             {/* Bento Gallery */}
//             <div className="gallery-wrap">
//                 <div
//                     ref={galleryRef}
//                     className="gallery gallery-bento"
//                 >
//                     {images.map((img, i) => (
//                         <div key={i} className="gallery-item relative">
//                             <Image
//                                 src={img}
//                                 alt="Luxury watch"
//                                 fill
//                                 className="object-cover"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Cinematic Text */}
//             <div className="absolute bottom-20 left-16 z-20 max-w-xl">
//                 <h1 className="text-5xl font-semibold text-luxury-ivory">
//                     Timeless Precision
//                 </h1>
//                 <p className="mt-4 text-luxury-ivory/70">
//                     Crafted for those who measure life in moments, not seconds.
//                 </p>
//             </div>
//         </section>
//     )
// }

// const images = [
//     "/watches/watch1.jpg",
//     "/watches/watch2.jpg",
//     "/watches/watch3.jpg",
//     "/watches/watch4.jpg",
//     "/watches/watch5.jpg",
//     "/watches/watch6.jpg",
//     "/watches/watch7.jpg",
//     "/watches/watch8.jpg"
// ]
