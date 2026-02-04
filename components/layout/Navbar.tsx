"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Sidebar from "./SIdebar"

const navItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Collections", href: "/collections" },
    { id: 3, label: "About", href: "/about" },
    { id: 4, label: "Contact", href: "/contact" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)
    const lastScroll = useRef(0)

    useEffect(() => {
        if (isOpen) return

        const handleScroll = () => {
            const current = window.scrollY
            setScrolled(current > 50)

            if (!navRef.current) return

            if (current > lastScroll.current && current > 100) {
                navRef.current.style.transform = "translateY(-100%)"
            } else {
                navRef.current.style.transform = "translateY(0)"
            }

            lastScroll.current = current
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isOpen])
    const iconColor = scrolled ? "text-black" : "text-white"
    const hoverStyle = scrolled
        ? "hover:bg-gray-100"
        : "hover:bg-white/20"



    return (
        <>
            {/* Navbar */}
            <div
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center h-16">

                    {/* Left */}
                    <div className="w-16 flex items-center">
                        <button
                            onClick={() => setIsOpen(true)}
                            className={`p-2 rounded-md transition ${iconColor} ${hoverStyle}`}

                        >
                            <Menu size={28} />
                        </button>

                    </div>

                    {/* Center */}
                    <div className="flex-1 flex justify-center">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="Jacob Logo"
                                width={20}
                                height={20}
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right */}
                    <div className="w-16 flex items-center justify-end gap-2">

                        <Link
                            href="/cart"
                            className={`p-2 rounded-md transition ${iconColor} ${hoverStyle}`}

                        >
                            <ShoppingCart size={24} />
                        </Link>

                        <Link
                            href="/account"
                            className={`p-2 rounded-md transition ${iconColor} ${hoverStyle}`}
                        >
                            <User size={24} />
                        </Link>

                    </div>

                </div>
            </div>

            {/* Sidebar */}
            <Sidebar
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                navItems={navItems}
            />
        </>
    )
}
