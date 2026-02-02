export type HeroData = {
    id: string
    title: string
    subtitle: string
    image: string
    alt: string
    overlay: boolean
    theme: "dark" | "light"
    animation?: {
        type: "framer" | "gsap"
        variant?: string
        duration?: number
    }
}

export type StoryItem = {
    id: string
    title: string
    description: string
    image: string
    alt: string
    layout: "image-left" | "image-right"
    animation?: {
        type: "gsap"
        trigger: "scroll"
        effect: "reveal" | "parallax"
        scrub?: boolean
    }
}

export type FeaturedItem = {
    id: string
    image: string
    alt: string
    badge?: string
    cta?: string
}

export type CTAData = {
    title: string
    subtitle: string
    background: string
    button: {
        label: string
        link: string
    }
}
