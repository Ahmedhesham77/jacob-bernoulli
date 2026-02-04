"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

type NavItem = {
    id: number
    label: string
    href: string
}

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
    navItems: NavItem[]
}

export default function Sidebar({ isOpen, onClose, navItems }: SidebarProps) {
    const pathname = usePathname() // للحصول على المسار الحالي

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.45 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-[60]"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        drag="x"
                        dragConstraints={{ left: -300, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(event, info) => {
                            if (info.offset.x < -100) onClose()
                        }}
                        className="fixed top-0 left-0 h-full w-full sm:w-80 bg-white z-[70] shadow-xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center px-6 h-16 border-b">
                            {/* Left */}
                            <div className="w-16">
                                <span className="font-semibold text-lg">Menu</span>
                            </div>

                            {/* Center */}
                            <div className="flex-1 flex justify-center">
                                <Link href="/" onClick={onClose}>
                                    <Image
                                        src="/logo.svg"
                                        alt="Logo"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* Right */}
                            <div className="w-16 flex justify-end">
                                <button onClick={onClose}>
                                    <X size={26} />
                                </button>
                            </div>
                        </div>

                        {/* Links */}
                        <ul className="flex flex-col mt-4">
                            {navItems.map(item => {
                                const isActive = pathname === item.href

                                return (
                                    <li key={item.id} className="border-b">
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="group block px-6 py-4 text-gray-800"
                                        >
                                            <span className="relative inline-block">
                                                {item.label}

                                                {/* Underline */}
                                                <span
                                                    className={`
                                                        absolute left-0 -bottom-0.5 h-[1.2px] bg-black
                                                        transition-all duration-300 ease-out
                                                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                                    `}
                                                />
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    )
}
