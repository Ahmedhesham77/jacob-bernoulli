import HeroSection from "@/components/layout/HeroSection"
import StorySections from "@/components/story/StorySection"
import FeaturedProducts from "@/components/product/FeaturedProduct"
import CTASection from "@/components/cta/CTASection"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <StorySections />
        <FeaturedProducts />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
