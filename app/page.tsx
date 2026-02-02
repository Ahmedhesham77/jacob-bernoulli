import HeroSection from "@/components/layout/HeroSection"
import StorySections from "@/components/story/StorySection"
import FeaturedProducts from "@/components/product/FeaturedProduct"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StorySections />
      <FeaturedProducts />
    </main>
  )
}
