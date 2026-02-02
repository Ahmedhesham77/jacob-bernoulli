import data from "@/data/images.mock.json"
import {
    HeroData,
    StoryItem,
    FeaturedItem,
    CTAData
} from "./types"

export function getHero(): HeroData {
    return data.hero as HeroData
}

export function getStory(): StoryItem[] {
    return data.story as StoryItem[]
}

export function getFeatured(): FeaturedItem[] {
    return data.featured.items as FeaturedItem[]
}

export function getCTA(): CTAData {
    return data.cta as CTAData
}
