"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getFeatured } from "@/lib/images"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1],
        },
    },
}

export default function FeaturedProducts() {
    const products = getFeatured()

    return (
        <section className="py-24 md:py-32 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold-muted">
                        The Collection
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
                        Curated Pieces
                    </h2>
                    <p className="mt-6 text-muted-foreground font-sans font-light max-w-xl mx-auto">
                        Each timepiece in our collection represents the pinnacle of horological excellence
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-card">
                                <div className="aspect-square overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.alt}
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                </div>

                                {product.badge && (
                                    <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-sans uppercase tracking-[0.2em] bg-background/90 backdrop-blur-sm text-foreground rounded-full">
                                        {product.badge}
                                    </span>
                                )}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="gap-2 font-sans text-xs uppercase tracking-wider"
                                    >
                                        {product.cta || "View Details"}
                                        <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-3 font-sans text-xs uppercase tracking-[0.2em] border-gold/30 text-foreground hover:bg-gold/10 hover:border-gold/50"
                    >
                        View All Collection
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
