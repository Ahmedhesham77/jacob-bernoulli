"use client"

import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getStory } from "@/lib/images"

gsap.registerPlugin(ScrollTrigger)

export default function StorySections() {
    const stories = getStory()
    const containerRef = useRef<HTMLElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            itemRefs.current.forEach((item, index) => {
                if (!item) return

                const image = item.querySelector(".story-image")
                const content = item.querySelector(".story-content")
                const isImageRight = stories[index].layout === "image-right"

                gsap.fromTo(
                    content,
                    {
                        opacity: 0,
                        x: isImageRight ? -60 : 60,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
                            end: "top 25%",
                            toggleActions: "play none none reverse",
                        },
                    }
                )

                gsap.fromTo(
                    image,
                    {
                        opacity: 0,
                        scale: 1.1,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            end: "top 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                )

                gsap.to(image, {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [stories])

    return (
        <section
            ref={containerRef}
            id="story"
            className="py-24 md:py-40 space-y-24 md:space-y-40"
        >
            <div className="text-center mb-16">
                <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold-muted">
                    Our Heritage
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
                    Crafted Through Time
                </h2>
            </div>

            {stories.map((story, index) => (
                <div
                    key={story.id}
                    ref={(el) => { itemRefs.current[index] = el }}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto px-6 items-center ${
                        story.layout === "image-right" ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                >
                    <div className="story-image overflow-hidden rounded-2xl">
                        <Image
                            src={story.image}
                            alt={story.alt}
                            width={700}
                            height={800}
                            className="w-full h-auto object-cover aspect-[4/5]"
                        />
                    </div>

                    <div className="story-content flex flex-col justify-center py-8 lg:py-16">
                        <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold-muted mb-4">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight mb-6 text-balance">
                            {story.title}
                        </h3>
                        <div className="h-px w-16 bg-gold/30 mb-6" />
                        <p className="text-lg md:text-xl font-sans font-light leading-relaxed text-muted-foreground max-w-lg">
                            {story.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    )
}
