"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getHero } from "@/lib/images"

export default function HeroSection() {
    const hero = getHero()

    return (
        <section className="relative h-screen overflow-hidden">
            <Image
                src={hero.image}
                alt={hero.alt}
                fill
                className="object-cover"
                priority
            />

            {hero.overlay && (
                <div className="absolute inset-0 bg-black/40" />
            )}

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: hero.animation?.duration ?? 1 }}
                className="relative z-10 flex h-full flex-col justify-center px-10 text-white"
            >
                <h1 className="text-6xl font-bold">{hero.title}</h1>

                <p className="mt-6 max-w-xl text-lg opacity-80">
                    {hero.subtitle}
                </p>
            </motion.div>
        </section>
    )
}
