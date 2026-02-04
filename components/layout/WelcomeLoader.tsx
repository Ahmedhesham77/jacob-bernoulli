"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    isVisible: boolean
}

export default function WelcomeLoader({ isVisible }: Props) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                >
                    <div className="w-[60px] h-[60px] sm:w-[150px] sm:h-[150px] relative">
                        <Image
                            src="/loader.gif"
                            alt="Loading"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
