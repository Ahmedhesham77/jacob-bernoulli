"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { getCTA } from "@/lib/images"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
    const cta = getCTA()
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
        <section
            ref={containerRef}
            className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden flex items-center justify-center"
        >
            <motion.div style={{ y }} className="absolute inset-0">
                <Image
                    src="/our-collections.avif"
                    alt="Luxury watch collection"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-6 max-w-4xl mx-auto"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="inline-block text-xs font-sans uppercase tracking-[0.4em] text-gold-muted mb-6"
                >
                    Begin Your Journey
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-foreground text-balance"
                >
                    {cta.title}
                </motion.h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="my-8 h-px w-24 mx-auto origin-center bg-gold/40"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl font-sans font-light text-muted-foreground max-w-xl mx-auto mb-10"
                >
                    {cta.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Button
                        size="lg"
                        className="gap-3 font-sans text-xs uppercase tracking-[0.2em] bg-gold text-background hover:bg-gold/90 px-8 py-6"
                        asChild
                    >
                        <a href={cta.button.link}>
                            {cta.button.label}
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </Button>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
            />
        </section>
    )
}
