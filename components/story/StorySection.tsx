"use client"

import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getStory } from "@/lib/images"

gsap.registerPlugin(ScrollTrigger)

export default function StorySections() {
    const stories = getStory()
    const container = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".story-item", {
                opacity: 0,
                y: 100,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
            })
        }, container)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="py-40 space-y-40">
            {stories.map(story => (
                <div
                    key={story.id}
                    className={`story-item grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 ${story.layout === "image-right" ? "md:flex-row-reverse" : ""
                        }`}
                >
                    <Image
                        src={story.image}
                        alt={story.alt}
                        width={600}
                        height={600}
                        className="rounded-xl"
                    />

                    <div className="flex flex-col justify-center">
                        <h3 className="text-3xl font-semibold mb-4">
                            {story.title}
                        </h3>
                        <p className="text-xl leading-relaxed opacity-80">
                            {story.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    )
}
