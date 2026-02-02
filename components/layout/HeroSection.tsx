"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getHero } from "@/lib/images"
import { ChevronDown } from "lucide-react"

const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
        },
    }),
}

const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            duration: 1,
            delay: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
}

export default function HeroSection() {
    const hero = getHero()

    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden">
            <Image
                src={hero.image}
                alt={hero.alt}
                fill
                className="object-cover scale-105"
                priority
                sizes="100vw"
            />

            {hero.overlay && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            )}

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-foreground">
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-6"
                >
                    <span className="text-xs font-sans uppercase tracking-[0.4em] text-gold-muted">
                        Est. 1892
                    </span>
                </motion.div>

                <motion.h1
                    custom={0.2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-balance"
                >
                    {hero.title}
                </motion.h1>

                <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="my-8 h-px w-24 origin-center bg-gold/40"
                />

                <motion.p
                    custom={0.5}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-md text-base sm:text-lg font-sans font-light tracking-wide text-muted-foreground"
                >
                    {hero.subtitle}
                </motion.p>

                <motion.div
                    custom={0.8}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-12"
                >
                    <a
                        href="#story"
                        className="group inline-flex flex-col items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <span>Discover</span>
                        <ChevronDown className="h-4 w-4 animate-bounce" />
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
            />
        </section>
    )
}
